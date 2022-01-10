const express = require("express");

const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} = require("../controllers/products");

/*************************************************** */
const authentication = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
/************************************************ */

const productsRouter = express.Router();

productsRouter.post("/", createNewProduct);
productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.get("/categories/:id", getProductsByCategory);

module.exports = productsRouter;
