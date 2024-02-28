const mongoose = require("mongoose");

const repliesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Reply content is required"],
    maxLength: [250, "Your reply must be less than 250 characters"],
  },
  replyingTo: {
    type: String,
    required: [true, "Replying to is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Reply = mongoose.model("Replie", repliesSchema);

module.exports = Reply;
