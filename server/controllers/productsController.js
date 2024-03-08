const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Reply = require("../models/repliesModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .populate("createdBy")
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
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
    const lowercaseCategory = req.query.category.toLowerCase();
    matchStage.category = {
      $regex: new RegExp("^" + lowercaseCategory + "$", "i"),
    };
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
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByUser",
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
        createdBy: { $arrayElemAt: ["$createdByUser", 0] },
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
      $unset: "createdBy.password",
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
  const { title, category, detail, createdBy } = req.body;

  if (!title || !category || !detail || !createdBy) {
    return next(
      new AppError("Either title, category or detail is missing", 400)
    );
  }

  const newProduct = await Product.create({
    title,
    category,
    description: detail,
    createdBy,
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
    .populate({
      path: "createdBy",
      select: "-__v",
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

  for (const comment of product.comments) {
    await Reply.deleteMany({ _id: { $in: comment.replies } });
  }

  await Comment.deleteMany({ _id: { $in: product.comments } });

  await Product.deleteOne({ _id: product._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.upvoteFeedback = catchAsync(async (req, res, next) => {
  const feedbackId = req.query.id;

  const user = await User.findById(req.body.user);

  const index = user.upvotedFeedbacks.indexOf(feedbackId);
  if (index !== -1) {
    user.upvotedFeedbacks.splice(index, 1);

    await Product.findByIdAndUpdate(feedbackId, { $inc: { upvotes: -1 } });
  } else {
    await Product.findByIdAndUpdate(feedbackId, { $inc: { upvotes: 1 } });

    user.upvotedFeedbacks.push(feedbackId);
  }

  await user.save({
    validateBeforeSave: false,
  });

  const updatedFeedback = await Product.findById(feedbackId);

  res.status(200).json({
    status: "success",
    data: {
      product: updatedFeedback,
    },
    user,
  });
});
