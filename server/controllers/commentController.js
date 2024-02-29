const Product = require("../models/productModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Comment = require("./../models/commentModel");

exports.createComment = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const product = await Product.findById(id);
  const user = await User.findById("65de70aa6b8ac8431c102bc7");

  const { comment } = req.body;

  if (!product) {
    return next(new AppError("A product with that ID was not found", 404));
  }

  if (!comment) {
    return next(new AppError("Please provide a comment", 400));
  }

  const newComment = await Comment.create({
    content: comment,
    user: user._id,
  });

  product.comments.push(newComment._id);

  await product.save();

  res.status(201).json({
    status: "success",
    data: {
      newComment,
    },
  });
});
