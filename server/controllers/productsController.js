const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log(req.query);

  let query = Product.find();

  if (req.query.category && req.query.category !== "all") {
    query = query.where("category").equals(req.query.category);
  }

  if (req.query.sort === "most-upvotes") {
    query = query.sort({ upvotes: -1 });
  }

  if (req.query.sort === "least-upvotes") {
    query = query.sort({ upvotes: 1 });
  }

  if (req.query.sort === "most-comments") {
    query = query.sort({ comments: -1 });
  }

  if (req.query.sort === "least-comments") {
    query = query.sort({ comments: 1 });
  }

  const products = await query
    .populate({
      path: "comments",
      select: "-__v",
      populate: [
        { path: "user", select: "-__v" },
        {
          path: "replies",
          select: "-__v",
          populate: { path: "user", select: "-__v" },
        },
      ],
    })
    .select("-__v");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
