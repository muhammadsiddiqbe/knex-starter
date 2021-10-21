"use strict";

const { User } = require("../../server/models");

exports.seed = (knex) =>
  knex(User.tableName)
    .del()
    .then(() => [
      {
        username: "admin",
        password: "password4565",
      },
      {
        username: "user",
        password: "password1",
      },
    ])
    .then((newUsers) => Promise.all(newUsers.map((user) => User.create(user))))
    .catch((err) => console.error("err: ", err));
