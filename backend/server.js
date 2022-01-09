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

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
