"use strict";

const { User } = require("../../server/modules/collector");

exports.seed = (knex) =>
  knex(User.tableName)
    .del()
    .then(() => [
      {
        username: "admin",
        password: "1234",
      },
      {
        username: "user",
        password: "password",
      },
    ])
    .then((newUsers) => Promise.all(newUsers.map((user) => User.create(user))))
    .catch((err) => console.error("err: ", err));
