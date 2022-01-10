const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories");

const categoriesRouter = express.Router();

categoriesRouter.post("/", createCategory);

categoriesRouter.get("/", getAllCategories);

module.exports = categoriesRouter;
