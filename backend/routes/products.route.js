const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createOrder,
  checkoutOrder,
} = require("../controllers/products.controller");

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(createProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

productRouter.post("/create-order", createOrder);
productRouter.post("/checkout", checkoutOrder);

module.exports = productRouter;
