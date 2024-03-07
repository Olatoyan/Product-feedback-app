const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

const { getUser, createUser, createReplies, createComments, createProducts } =
  userController;

const { signup, login, logout } = authController;

router.route("/").get(getUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/create-user").post(createUser);
router.route("/create-reply").post(createReplies);
router.route("/create-comment").post(createComments);
router.route("/create-products").post(createProducts);

module.exports = router;
