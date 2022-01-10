const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryByTitle,
} = require("../controllers/categories");

const authentication = require("../middleware/authentication");
const categoriesRouter = express.Router();

categoriesRouter.post("/", authentication, createCategory);

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:title", getCategoryByTitle);

module.exports = categoriesRouter;
