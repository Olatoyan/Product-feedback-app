const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
        { path: "user", select: "-__v" },
        {
          path: "replies",
          select: "-__v",
          populate: { path: "user", select: "-__v" },
        },
      ],
    })
    .select("-__v");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getAllSuggestedProducts = catchAsync(async (req, res, next) => {
  console.log(req.query);
  console.log(req.query.category);

  let query = Product.find().where("status").equals("suggestion");

  if (req.query.category && req.query.category !== "all") {
    query = query.where("category").equals(req.query.category);
  }

  let sortBy = {};

  if (req.query.sortBy === "most-upvotes") {
    sortBy = { upvotes: -1 };
  }

  if (req.query.sortBy === "least-upvotes") {
    sortBy = { upvotes: 1 };
  }

  if (req.query.sortBy === "most-comments") {
    sortBy = { comments: -1 };
  }

  if (req.query.sortBy === "least-comments") {
    sortBy = { comments: 1 };
  }

  const products = await query
    .sort(sortBy)
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
        { path: "user", select: "-__v" },
        {
          path: "replies",
          select: "-__v",
          populate: { path: "user", select: "-__v" },
        },
      ],
    })
    .select("-__v");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { title, category, detail } = req.body;

  if (!title || !category || !detail) {
    return next(
      new AppError("Either title, category or detail is missing", 400)
    );
  }

  const newProduct = await Product.create({
    title,
    category,
    description: detail,
  });

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const { title, category, detail, status } = req.body;

  if (!title || !category || !detail || !status) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.id,
    {
      title,
      category,
      description: detail,
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

exports.findProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
        { path: "user", select: "-__v" },
        {
          path: "replies",
          select: "-__v",
          populate: { path: "user", select: "-__v" },
        },
      ],
    })
    .select("-__v");

  if (!product) {
    return next(new AppError("A product with that ID was not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
