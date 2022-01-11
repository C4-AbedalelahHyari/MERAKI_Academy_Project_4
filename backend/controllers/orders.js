const ordersModel = require("../database/models/orders");

const getAllOrders = (req, res) => {
  ordersModel
    .find({})
    .populate("product_id user_id")
    .then((orders) => {
      if (orders.length) {
        let totalPrice = 0;
        const accessPrice = orders[0].product_id;
        for (let i = 0; i < accessPrice.length; i++) {
          totalPrice += accessPrice[i].price;
        }
        res.status(200).json({
          success: true,
          message: `All The Orders`,
          orders: orders,
          totalPrice: totalPrice,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Orders Yet`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/******************************************************************************** */
const createOrder = (req, res) => {
  const user_id = req.token.userId;
  console.log(user_id);
  const { product_id } = req.body;
  const newOrder = new ordersModel({
    product_id,
    user_id,
    //totalPrice, // think of it
  });
  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `The Order has been created`,
        order: order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

/*************************************** */
//getMyOrder
// CheckOut Button
const getMyOrders = (req, res) => {
  let user_ID = req.token.userId;
  ordersModel
    .find({ user_id: user_ID })
    .populate("product_id user_id")
    .then((myOrders) => {
      if (myOrders.length) {
        res.status(200).json({
          success: true,
          message: `All your Orders`,
          orders: myOrders,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `You dont have any Orders Yet`,
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
module.exports = { getAllOrders, createOrder, getMyOrders };
