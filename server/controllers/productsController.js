const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Reply = require("../models/repliesModel");
const Comment = require("../models/commentModel");

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
  const matchStage = { status: "suggestion" };
  if (req.query.category && req.query.category !== "all") {
    matchStage.category = req.query.category;
  }

  let sortBy = {};
  if (req.query.sortBy === "most-upvotes") {
    sortBy = { upvotes: -1 };
  } else if (req.query.sortBy === "least-upvotes") {
    sortBy = { upvotes: 1 };
  } else if (req.query.sortBy === "most-comments") {
    sortBy = { numComments: -1 };
  } else if (req.query.sortBy === "least-comments") {
    sortBy = { numComments: 1 };
  }

  const aggregationPipeline = [
    {
      $match: matchStage,
    },
    {
      $addFields: {
        numComments: { $size: "$comments" },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        category: 1,
        upvotes: 1,
        status: 1,
        description: 1,
        numComments: 1,
        comments: {
          $map: {
            input: "$comments",
            as: "comment",
            in: {
              $mergeObjects: [
                "$$comment",
                {
                  user: { $arrayElemAt: ["$comments.user", 0] },
                  replies: { $ifNull: ["$comments.replies", []] },
                },
              ],
            },
          },
        },
      },
    },
    {
      $sort: sortBy,
    },
  ];

  const products = await Product.aggregate(aggregationPipeline);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// exports.getAllSuggestedProducts = catchAsync(async (req, res, next) => {

//   let query = Product.find().where("status").equals("suggestion");

//   if (req.query.category && req.query.category !== "all") {
//     query = query.where("category").equals(req.query.category);
//   }

//   let sortBy = {};

//   if (req.query.sortBy === "most-upvotes") {
//     sortBy = { upvotes: -1 };
//   }

//   if (req.query.sortBy === "least-upvotes") {
//     sortBy = { upvotes: 1 };
//   }

//   if (req.query.sortBy === "most-comments") {
//     sortBy = { "comments.length": -1 };
//   }

//   if (req.query.sortBy === "least-comments") {
//     sortBy = { "comments.length": 1 };
//   }

//   const products = await query
//     .sort(sortBy)
//     .populate({
//       path: "comments",
//       select: "-__v",
//       populate: [
//         { path: "user", select: "-__v" },
//         {
//           path: "replies",
//           select: "-__v",
//           populate: { path: "user", select: "-__v" },
//         },
//       ],
//     })
//     .select("-__v");

//   res.status(200).json({
//     status: "success",
//     results: products.length,
//     data: {
//       products,
//     },
//   });
// });

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
exports.deleteProduct = catchAsync(async (req, res, next) => {
  // Find the product and populate its comments with user and replies
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

  // Iterate through the comments and delete their associated replies
  for (const comment of product.comments) {
    await Reply.deleteMany({ _id: { $in: comment.replies } });
  }

  // Delete the comments
  await Comment.deleteMany({ _id: { $in: product.comments } });

  // Finally, delete the product
  await Product.deleteOne({ _id: product._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.increaseUpvotes = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new AppError("A product with that ID was not found", 404));
  }
  product.upvotes += 1;
  await product.save(); // Save the updated product after incrementing upvotes
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
