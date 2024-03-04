const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

const { createComment, editComment, deleteComment } = commentController;

router.route("/createComment").post(createComment);
router.route("/editComment").post(editComment);
router.route("/deleteComment").delete(deleteComment);

module.exports = router;
