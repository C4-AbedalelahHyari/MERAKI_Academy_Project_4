const express = require("express");
const { getAllOrders, createOrder } = require("../controllers/orders");

const ordersRouter = express.Router();

/*************************************************** */
const authentication = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
/************************************************ */

ordersRouter.get(
  "/",
  authentication,
  authorization("Add_Products"),
  getAllOrders
);

ordersRouter.post("/", authentication, createOrder);

module.exports = ordersRouter;
