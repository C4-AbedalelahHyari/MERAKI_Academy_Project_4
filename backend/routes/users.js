const express = require("express");
const { createNewUser, getAllUsers, login } = require("../controllers/users");
const usersRouter = express.Router();
/******************************************************************************** */
/*************************************************** */
const authentication = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
/************************************************ */
usersRouter.post("/", createNewUser);

usersRouter.get("/", getAllUsers);
usersRouter.post("/login", login);

module.exports = usersRouter;
