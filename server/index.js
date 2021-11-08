"use strict";
require("./modules/collector");

const express = require("express");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authCheck = require("./middleware/token_checker");

const app = express();

app.use(express.json());
app.use(cookie());
app.use(fileUpload());
app.disable("x-powered-by");

app.use(authCheck);
app.use("/", require("./modules/routes"));
app.use(require("./middleware/error_middleware").all);

module.exports = app;
