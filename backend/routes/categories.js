const express = require("express");
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories");
/*************************************************** */
const authentication = require("../middleware/authentication");
const  authorization  = require("../middleware/authorization");
/************************************************ */
const categoriesRouter = express.Router();

categoriesRouter.post(
  "/",
  authentication,
  authorization("Add_Products"),
  createCategory
);

categoriesRouter.get("/", getAllCategories);

//categoriesRouter.get("/:title", authentication, getCategoryByTitle); // delete

module.exports = categoriesRouter;
