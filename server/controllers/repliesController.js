const Reply = require("../models/repliesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

exports.getReplyingTo = catchAsync(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username }).select("-__v");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  req.username = user.username;

  next();
});

exports.replyComment = catchAsync(async (req, res, next) => {
  const { comment, id, username } = req.body;

  // Fetch all users from the database
  const users = await User.find();

  // Check if there are users in the database
  if (!users.length) {
    return next(new AppError("No users found in the database", 404));
  }

  // Randomly select a user from the list
  const randomUser = users[Math.floor(Math.random() * users.length)];

  const findComment = await Comment.findById(id);

  console.log(findComment);
  const reply = await Reply.create({
    content: comment,
    replyingTo: username,
    user: randomUser._id,
  });

  findComment.replies.push(reply._id);
  await findComment.save();

  res.status(201).json({
    status: "success",
    data: {
      reply,
    },
  });
});
