const categoriesModel = require("../database/models/categories");
/************************************* */
const createCategory = (req, res) => {
  const { title } = req.body;
  const newCategory = new categoriesModel({
    title,
  });
  newCategory
    .save()
    .then((category) => {
      res.status(201).json({
        success: true,
        message: `The Category has been created`,
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/************************************* */
const getAllCategories = (req, res) => {
  categoriesModel
    .find({})
    .then((categories) => {
      if (categories.length) {
        res.status(200).json({
          success: true,
          message: `All The Categories`,
          categories: categories,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Categories Yet`,
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
/************************************************* */
module.exports = {
  createCategory,
  getAllCategories,
};
