const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryByTitle,
} = require("../controllers/categories");
/*************************************************** */
const authentication = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
/************************************************ */
const categoriesRouter = express.Router();

categoriesRouter.post(
  "/",
  authentication,
  authorization("Add_Products"),
  createCategory
);

categoriesRouter.get("/", authentication, getAllCategories);

categoriesRouter.get("/:title", authentication, getCategoryByTitle);

module.exports = categoriesRouter;
