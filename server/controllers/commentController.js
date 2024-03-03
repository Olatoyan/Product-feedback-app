const Product = require("../models/productModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Comment = require("./../models/commentModel");

exports.createComment = catchAsync(async (req, res, next) => {
  // Fetch all users from the database
  const users = await User.find();

  // Check if there are users in the database
  if (!users.length) {
    return next(new AppError("No users found in the database", 404));
  }

  // Randomly select a user from the list
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
