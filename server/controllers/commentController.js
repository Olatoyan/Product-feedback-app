const Product = require("../models/productModel");
const Reply = require("../models/repliesModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Comment = require("./../models/commentModel");

exports.createComment = catchAsync(async (req, res, next) => {
  const users = await User.find();

  const randomUser = users[Math.floor(Math.random() * users.length)];

  const { comment, id } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError("A product with that ID was not found", 404));
  }

  if (!comment) {
    return next(new AppError("Please provide a comment", 400));
  }

  const newComment = await Comment.create({
    content: comment,
    user: randomUser._id,
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

exports.editComment = catchAsync(async (req, res, next) => {
  const { comment, id } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    { content: comment },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedComment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.query.id).populate("replies");

  console.log(comment);

  if (!comment) {
    return next(new AppError("A comment with that ID was not found", 404));
  }

  for (const reply of comment.replies) {
    await Reply.deleteOne({ _id: reply._id });
  }

  await Comment.deleteOne({ _id: comment._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
