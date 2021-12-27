"use strict";

const { User } = require("../../server/modules/collector");

exports.seed = (knex) =>
  knex(User.tableName)
    .del()
    .then(() => [
      {
        username: "admin",
        password: "admin",
        email: "admin@example.com",
        picture: "https://i.imgur.com/qJHXKQO.jpg",
      },
      {
        username: "user",
        password: "user",
        email: "admin@example.com",
        picture: "https://i.imgur.com/qJHXKQO.jpg",
      },
    ])
    .then((newUsers) => Promise.all(newUsers.map((user) => User.create(user))))
    .catch((err) => console.error("err: ", err));
