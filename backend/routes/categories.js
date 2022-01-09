const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories");
const categoriesRouter = express.Router();

categoriesRouter.post("/categories", createCategory);

categoriesRouter.get("/categories", getAllCategories);

module.exports = categoriesRouter;
