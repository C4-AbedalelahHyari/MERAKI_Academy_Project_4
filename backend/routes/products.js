const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  getProductByName,
} = require("../controllers/products");

/**************************************************************** */
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
/*************************************************************** */

const productsRouter = express.Router();

productsRouter.post(
  "/add",
  authentication,
  authorization("Add_Products"),
  createNewProduct
);
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put(
  "/:id",
  authentication,
  authorization("Add_Products"),
  updateProductById
);
productsRouter.delete(
  "/:id",
  authentication,
  authorization("Add_Products"),
  deleteProductById
);
productsRouter.get("/categories/:id", getProductsByCategory);
productsRouter.get("/:name", getProductByName);

module.exports = productsRouter;
