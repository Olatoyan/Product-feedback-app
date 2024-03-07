const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    enum: ["in-progress", "live", "suggestion", "planned"],
    default: "suggestion",
    required: [true, "Status is required"],
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [250, "Your description must be less than 250 characters"],
    trim: true,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
