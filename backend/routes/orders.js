const express = require("express");
const {
  getAllOrders,
  createOrder,
  getMyOrders,
} = require("../controllers/orders");

const ordersRouter = express.Router();

/********************************************************** */
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
/*********************************************************** */
ordersRouter.get(
  "/",
  authentication,
  authorization("View_Orders"),
  getAllOrders
);

// get myOrders :logged in user
ordersRouter.get("/myOrders", authentication, getMyOrders);

ordersRouter.post("/", authentication, createOrder);

module.exports = ordersRouter;
