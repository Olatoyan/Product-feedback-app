const express = require("express");

const repliesController = require("./../controllers/repliesController");

const router = express.Router();

const { replyComment, deleteReply, editReply } = repliesController;

router.route("/replyComment").post(replyComment);
router.route("/editReply").post(editReply);
router.route("/deleteReply").delete(deleteReply);

module.exports = router;
