const ordersModel = require("../database/models/orders");

const getAllOrders = (req, res) => {
  ordersModel
    .find({})
    .populate("orders")
    .then((orders) => {
      if (orders.length) {
        res.status(200).json({
          success: true,
          message: `All The Orders`,
          orders: orders,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Orders Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/********************** */
const createOrder = (req, res) => {
  const { product_id, user_id } = req.body;
  const newOrder = new ordersModel({
    product_id,
    user_id,
  });
  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `The Category has been created`,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = { getAllOrders, createOrder };
