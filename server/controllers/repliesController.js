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

  const user = await User.findById("65de70aa6b8ac8431c102bc7");

  const findComment = await Comment.findById(id);

  console.log(findComment);
  const reply = await Reply.create({
    content: comment,
    replyingTo: username,
    user: user._id,
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
