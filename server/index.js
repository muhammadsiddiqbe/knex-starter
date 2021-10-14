"use strict";
require("dotenv").config();

const express = require("express");
const cookie = require("cookie-parser");
const tokenCheker = require("./middleware/token_checker");

const app = express();

app.use(express.json());
app.use(cookie());
app.disable("x-powered-by");

app.use(tokenCheker);

app.use("/", [
  require("./routes/auth_routes"),
  require("./routes/user_routes"),
]);

app.use(require("./middleware/error_middleware").all);

module.exports = app;
