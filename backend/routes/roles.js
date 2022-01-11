const express = require("express");
const { createNewRole, getAllRoles } = require("../controllers/roles");
const rolesRouter = express.Router();
/*************************************************************** */
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
/********************************************************* */

rolesRouter.post(
  "/",
  authentication,
  authorization("Add_Products"),
  createNewRole
);

rolesRouter.get("/", getAllRoles);

module.exports = rolesRouter;
