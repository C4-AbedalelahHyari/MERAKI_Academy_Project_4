const usersModel = require("../database/models/users");
/********************************************************** */
const createNewUser = (req, res) => {
  const { userName, country, email, password, role } = req.body;

  const newUser = new usersModel({
    userName,
    country,
    email,
    password,
    role,
  });
  newUser
    .save()
    .then((user) => {
      res.status(201).json({
        success: true,
        message: `The User has been created`,
        user: user,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
/******************************* */
const getAllUsers = (req, res) => {
  usersModel
    .find({})
    .populate("role", "-__v -_id")
    .then((users) => {
      res.status(200).json({
        success: true,
        message: `All The Users`,
        users: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No users Yet`,
      });
    });
};
/*************************************** */
module.exports = {
  createNewUser,
  getAllUsers,
};
