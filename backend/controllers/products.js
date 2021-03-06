const productsModel = require("../database/models/products");
/************************************************************** */
const createNewProduct = (req, res) => {
  const { name, price, rating, imageSrc, category, description } = req.body;
  const newProduct = new productsModel({
    name,
    price,
    rating,
    imageSrc,
    category,
    description,
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
  const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
  const skip = parseInt(req.query.skip); // Make sure to parse the skip to number
  productsModel
    .find({})
    .skip(skip)
    .limit(limit)
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
// filter
const getProductsByCategory = (req, res) => {
  // the categoryName will be an Object_id
  let categoryName = req.params.id;
  productsModel
    .find({ category: categoryName })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the Products with this category: ${categoryName}`,
        products: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/************************************************************* */
// Search product by name
const getProductByName = (req, res) => {
  let product_name = req.params.name;
  categoriesModel
    .find({ name: product_name })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          category: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Products found with this name: ${product_name}`,
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

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  getProductByName,
};
