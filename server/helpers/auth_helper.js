"use strict";
const router = require("express").Router();

const { User } = require("../modules/collector");
const { sign } = require("../utils/jwt");

const { createError, BAD_REQUEST, UNAUTHORIZED } = require("./error_helper");

const postLogin = async (req, res, next) => {
  const username = String(req.body.username);
  const password = String(req.body.password);

  if (!username || !password) {
    next(
      createError({
        status: BAD_REQUEST,
        message: "`username` + `password` are required fields",
      })
    );
  }

  User.verify(username, password)
    .then(async (user) => {
      const token = await sign(user, {
        expiresIn: "24h",
      });

      res.cookie("token", token).json({
        ok: true,
        message: "Login successful!",
        token: token,
      });
    })
    .catch((err) =>
      next(
        createError({
          status: UNAUTHORIZED,
          message: err,
        })
      )
    );
};

const postRegister = (req, res, next) => {
  const props = req.body;

  User.findOne({ username: props.username })
    .then((user) => {
      if (user)
        return next(
          createError({
            status: CONFLICT,
            message: "Username already exists",
          })
        );

      return User.create(props);
    })
    .then((user) =>
      res.json({
        ok: true,
        message: "Registration successful",
        user,
      })
    )
    .catch(next);
};

router.route("/status").get((req, res, next) => {
  res.json({
    ok: true,
    message: "Status OK",
  });
});

router.route("/login").post(postLogin);
router.route("/register").post(postRegister);

module.exports = router;
