const express = require("express");

const productsController = require("./../controllers/productsController");

const router = express.Router();

const {
  getAllProducts,
  getAllSuggestedProducts,
  createProduct,
  editProduct,
  findProduct,
  deleteProduct,
  increaseUpvotes,
} = productsController;

router.route("/getAllProducts").get(getAllProducts);
router.route("/getProduct").get(findProduct);
router.route("/getAllSuggestedProducts").get(getAllSuggestedProducts);
router.route("/createProduct").post(createProduct);
router.route("/increaseUpvotes").post(increaseUpvotes);
router.route("/editProduct").post(editProduct);
router.route("/deleteProduct").delete(deleteProduct);

module.exports = router;
