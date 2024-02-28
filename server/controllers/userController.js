const Product = require("../models/productModel");
const Comment = require("./../models/commentModel");
const Reply = require("./../models/repliesModel");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-__v");
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = req.body.forEach((user) => {
    const newUser = new User(user);
    newUser.save();
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createReplies = catchAsync(async (req, res, next) => {
  const user = req.body.forEach((user) => {
    const newUser = new Reply(user);
    newUser.save();
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.createComments = catchAsync(async (req, res, next) => {
  const user = req.body.forEach((user) => {
    const newUser = new Comment(user);
    newUser.save();
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.createProducts = catchAsync(async (req, res, next) => {
  const user = req.body.forEach((user) => {
    const newUser = new Product(user);
    newUser.save();
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
