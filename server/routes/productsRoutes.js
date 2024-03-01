const express = require("express");

const productsController = require("./../controllers/productsController");

const router = express.Router();

const { getAllSuggestedProducts, createProduct, editProduct } =
  productsController;

router.route("/getAllSuggestedProducts").get(getAllSuggestedProducts);
router.route("/createProduct").post(createProduct);
router.route("/editProduct").post(editProduct);

module.exports = router;
