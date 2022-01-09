const productsModel = require("../database/models/products");
/************************************************************** */
const createNewProduct = (req, res) => {
  const { name, price, rating, views, category } = req.body;
  const newProduct = new productsModel({
    name,
    price,
    rating,
    views,
    category,
  });
  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `The product has been created`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/*********************************************************** */
const getAllProducts = (req, res) => {
  productsModel
    .find({})
    .populate("category", "-_id -__v")
    .then((products) => {
      res.status(200).json({
        success: true,
        message: `All The Products`,
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No Products Yet`,
      });
    });
};
/**************************************************** */
module.exports = {
  createNewProduct,
  getAllProducts,
};
