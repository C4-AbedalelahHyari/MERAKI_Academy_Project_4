const usersModel = require("../database/models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      if (users.length) {
        res.status(200).json({
          success: true,
          message: `All The Users`,
          users: users,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No users Yet`,
      });
    });
};
/*************************************** */
const login = (req, res) => {
  const { email, password } = req.body;
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you have entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          userName: result.userName,
          role: result.role,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/****************************************************** */
module.exports = {
  createNewUser,
  getAllUsers,
  login,
};
