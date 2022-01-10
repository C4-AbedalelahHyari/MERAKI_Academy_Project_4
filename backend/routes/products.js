const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.post("/", createNewProduct);

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);

module.exports = productsRouter;
