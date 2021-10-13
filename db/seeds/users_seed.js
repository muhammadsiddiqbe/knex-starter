"use strict";

const { User } = require("../../server/models");
console.log(User);

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
    .catch((err) => console.log("err: ", err));
