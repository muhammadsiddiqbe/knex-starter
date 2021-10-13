"use strict";

const bcrypt = require("bcrypt");
const createGuts = require("../helpers/model-guts");

const name = "User";
const tableName = "users";

const selectableProps = ["id", "username", "updated_at", "created_at"];

const SALT_ROUNDS = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const beforeSave = (user) => {
  if (!user.password) return Promise.resolve(user);

  return hashPassword(user.password)
    .then((hash) => ({ ...user, password: hash }))
    .catch((err) => `Error hashing password: ${err}`);
};

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = (props) => beforeSave(props).then((user) => guts.create(user));

  const verify = (username, password) => {
    const matchErrorMsg = "Username or password do not match";

    return knex
      .select()
      .from(tableName)
      .where({ username })
      .timeout(guts.timeout)
      .then((user) => {
        if (!user.length) throw matchErrorMsg;

        return user;
      })
      .then((user) => {
        Promise.all([user, verifyPassword(password, user.password)]);
      })
      .then(([user, isMatch]) => {
        if (!isMatch) throw matchErrorMsg;

        return user;
      });
  };

  return {
    ...guts,
    create,
    verify,
  };
};
