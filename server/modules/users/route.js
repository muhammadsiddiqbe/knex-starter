"use strict";

const router = require("express").Router();

const {
  signUp
  ,
  getUsers,
  getUser,
  putUser,
  deleteUser,
} = require("./controller");

router.route("/users").post(signUp).get(getUsers);
router.route("/users/:id").get(getUser).put(putUser).delete(deleteUser);

module.exports = router;
