const roleModel = require("../database/models/roles");
/******************************************************** */
const createNewRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((role) => {
      res.status(201).json({
        success: true,
        message: `The role has been created`,
        role: role,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/******************************************** */
const getAllRoles = (req, res) => {
  roleModel
    .find({})
    .then((roles) => {
      res.status(200).json({
        success: true,
        message: `All The Roles`,
        roles: roles,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = { createNewRole, getAllRoles };
