const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Comment content is required"],
    maxLength: [250, "Your comment must be less than 250 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Replie",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
