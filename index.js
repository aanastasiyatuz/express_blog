require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

sequelize.sync()

const app = express();

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.port)