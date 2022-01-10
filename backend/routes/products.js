const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.post("/", createNewProduct);

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", updateProductById);

module.exports = productsRouter;
