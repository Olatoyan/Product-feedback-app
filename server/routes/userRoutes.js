const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();

const { getUser, createUser, createReplies, createComments, createProducts } =
  userController;

router.route("/").get(getUser);

router.route("/create-user").post(createUser);
router.route("/create-reply").post(createReplies);
router.route("/create-comment").post(createComments);
router.route("/create-products").post(createProducts);

module.exports = router;
