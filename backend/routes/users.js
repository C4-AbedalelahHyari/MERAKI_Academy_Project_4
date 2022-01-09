const express = require("express");
const { createNewUser, getAllUsers } = require("../controllers/users");
const usersRouter = express.Router();
/************************************************ */

usersRouter.post("/users", createNewUser);

usersRouter.get("/users", getAllUsers);

module.exports = usersRouter;
