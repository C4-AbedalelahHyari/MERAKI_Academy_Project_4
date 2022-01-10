const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.post("/", createNewProduct);

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);

module.exports = productsRouter;
