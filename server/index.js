"use strict";

const express = require("express");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authCheck = require("./middleware/token_checker");

const collector = require("./collector");
/*const rateLimitter = new require("rate-limiter-flexible")(
  require("../config/rateLimitter")
);*/

const app = express();

app.use(express.json());
app.use(cookie());
app.use(fileUpload());
app.disable("x-powered-by");

app.use(authCheck);

app.use("/", [
  require("./routes/auth_routes"),
  require("./routes/user_routes"),
]);

app.use(require("./middleware/error_middleware").all);

module.exports = app;
