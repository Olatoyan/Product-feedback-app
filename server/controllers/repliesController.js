const Reply = require("../models/repliesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");

exports.replyComment = catchAsync(async (req, res, next) => {
  const { comment, id, username, userId } = req.body;

  const findComment = await Comment.findById(id);

  const reply = await Reply.create({
    content: comment,
    replyingTo: username,
    user: userId,
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
  const replyId = req.query.id;
  const reply = await Reply.findById(replyId);

  if (!reply) {
    return next(new AppError("A reply with that ID was not found", 404));
  }

  await Reply.deleteOne({ _id: reply._id });

  await Comment.updateMany(
    { replies: replyId },
    { $pull: { replies: replyId } }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});
