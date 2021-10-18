"use strict";
require("dotenv").config();

const express = require("express");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const tokenCheker = require("./middleware/token_checker");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/images", express.static(path.resolve(__dirname, "../images")));
app.use(cookie());
app.use(fileUpload());
app.disable("x-powered-by");

app.use(tokenCheker);

app.use("/", [
  require("./routes/auth_routes"),
  require("./routes/user_routes"),
  require("./routes/portfolio_routes"),
]);

// app.use(require("./middleware/error_middleware").all);

module.exports = app;
