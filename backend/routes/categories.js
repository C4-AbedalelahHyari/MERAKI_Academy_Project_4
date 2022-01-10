const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryByTitle,
} = require("../controllers/categories");

const categoriesRouter = express.Router();

categoriesRouter.post("/", createCategory);

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:title", getCategoryByTitle);

module.exports = categoriesRouter;
