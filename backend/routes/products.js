const express = require("express");

const { createNewProduct, getAllProducts } = require("../controllers/products");

const productsRouter = express.Router();

productsRouter.post("/products", createNewProduct);

productsRouter.get("/products", getAllProducts);

module.exports = productsRouter;
