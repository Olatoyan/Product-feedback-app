const express = require("express");

const repliesController = require("./../controllers/repliesController");

const router = express.Router();

const { getReplyingTo, replyComment } = repliesController;

router.route("/replyComment").post(getReplyingTo, replyComment);

module.exports = router;
