const express = require("express");
const { createNewRole, getAllRoles } = require("../controllers/roles");
const rolesRouter = express.Router();

rolesRouter.post("/roles", createNewRole);

rolesRouter.get("/roles", getAllRoles);

module.exports = rolesRouter;
