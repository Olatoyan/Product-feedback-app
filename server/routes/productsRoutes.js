const express = require("express");

const productsController = require("./../controllers/productsController");

const router = express.Router();

const { getAllProducts, createProduct } = productsController;

router.route("/getAllProducts").get(getAllProducts);
router.route("/createProduct").get(createProduct);

module.exports = router;
