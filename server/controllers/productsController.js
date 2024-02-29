const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log(req.query);

  let query = Product.find();

  if (req.query.category && req.query.category !== "all") {
    query = query.where("category").equals(req.query.category);
  }

  if (req.query.sort === "most-upvotes") {
    query = query.sort({ upvotes: -1 });
  }

  if (req.query.sort === "least-upvotes") {
    query = query.sort({ upvotes: 1 });
  }

  if (req.query.sort === "most-comments") {
    query = query.sort({ comments: -1 });
  }

  if (req.query.sort === "least-comments") {
    query = query.sort({ comments: 1 });
  }

  const products = await query
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
