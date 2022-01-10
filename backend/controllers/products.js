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
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All The Products`,
          products: products,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Products Yet`,
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
/**************************************************************** */

const getProductById = (req, res) => {
  let product_id = req.params.id;
  productsModel
    .findById(product_id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Product not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Product ${product_id} `,
        product: result,
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
/************************************************************** */

const updateProductById = (req, res) => {
  let product_id = req.params.id;
  productsModel
    .findByIdAndUpdate(product_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Product not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Product ${product_id} `,
        product: result,
      });
    });
};
/************************************************************** */
const deleteProductById = (req, res) => {
  let product_id = req.params.id;
  productsModel
    .findByIdAndDelete(product_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Product not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete product with id: ${product_id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/******************************************************** */
// update // delete // admin
// get product by object-id (gatgrey) // filteration

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
