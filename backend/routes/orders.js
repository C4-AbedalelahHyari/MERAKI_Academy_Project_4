const express = require("express");
const { getAllOrders, createOrder } = require("../controllers/orders");

const ordersRouter = express.Router();

ordersRouter.get("/", getAllOrders);

ordersRouter.post("/", createOrder);

module.exports = ordersRouter;