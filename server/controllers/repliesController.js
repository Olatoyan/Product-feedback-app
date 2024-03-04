const Reply = require("../models/repliesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

exports.replyComment = catchAsync(async (req, res, next) => {
  const { comment, id, username } = req.body;

  const users = await User.find();

  if (!users.length) {
    return next(new AppError("No users found in the database", 404));
  }

  const randomUser = users[Math.floor(Math.random() * users.length)];

  const findComment = await Comment.findById(id);

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

exports.editReply = catchAsync(async (req, res, next) => {
  const { comment, id } = req.body;

  const updatedComment = await Reply.findByIdAndUpdate(
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

exports.deleteReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.findById(req.query.id);

  if (!reply) {
    return next(new AppError("A reply with that ID was not found", 404));
  }

  await Reply.deleteOne({ _id: reply._id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
