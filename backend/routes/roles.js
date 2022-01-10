const express = require("express");
const { createNewRole, getAllRoles } = require("../controllers/roles");
const rolesRouter = express.Router();

rolesRouter.post("/", createNewRole);

rolesRouter.get("/", getAllRoles);

module.exports = rolesRouter;
