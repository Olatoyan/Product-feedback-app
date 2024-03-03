const express = require("express");

const repliesController = require("./../controllers/repliesController");

const router = express.Router();

const { getReplyingTo, replyComment } = repliesController;

// router.route("/replyComment").post(getReplyingTo, replyComment);
router.route("/replyComment").post(replyComment);

module.exports = router;
