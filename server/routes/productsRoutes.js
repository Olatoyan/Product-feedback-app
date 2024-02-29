const express = require("express");

const productsController = require("./../controllers/productsController");

const router = express.Router();

const { getAllProducts, createProduct, editProduct } = productsController;

router.route("/getAllProducts").get(getAllProducts);
router.route("/createProduct").post(createProduct);
router.route("/editProduct").post(editProduct);

module.exports = router;
