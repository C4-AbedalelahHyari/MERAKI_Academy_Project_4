const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());
const PORT = 5000;
/******************************** */

// import the categoriesRouter
const categoriesRouter = require("./routes/categories");
app.use("/", categoriesRouter);
// import the rolesRouter

const rolesRouter = require("./routes/roles");
app.use("/", rolesRouter);

// import the usersRouter
const usersRouter = require("./routes/users");
app.use("/", usersRouter);

// import the productsRouter
const productsRouter = require("./routes/products");
app.use("/", productsRouter);
/******************************* */
app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
