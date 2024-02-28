const express = require("express");

const productsController = require("./../controllers/productsController");

const router = express.Router();

const { getAllProducts } = productsController;

router.route("/getAllProducts").get(getAllProducts);

// router.route("/create-user").post(createUser);
// router.route("/create-reply").post(createReplies);
// router.route("/create-comment").post(createComments);
// router.route("/create-products").post(createProducts);

module.exports = router;
