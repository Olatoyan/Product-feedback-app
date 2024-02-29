const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

const { createComment } = commentController;

router.route("/createComment").post(createComment);

module.exports = router;
