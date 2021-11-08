"use strict";

const bcrypt = require("bcrypt");
const createGuts = require("../../helpers/model-guts");

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

  const create = (props) => {
    return beforeSave(props).then((user) => guts.create(user));
  };

  const verify = async (username, password) => {
    const matchErrorMsg = "Username or password do not match";

    let user = await knex
      .select()
      .from(tableName)
      .where({ username })
      .andWhere({ deleted: false })
      .timeout(guts.timeout)
      .first()
      .then(async (user) => {
        const isPasswordTrue = await verifyPassword(password, user.password);

        if (isPasswordTrue === false) {
          throw matchErrorMsg;
        } else {
          return {
            id: user.id,
            username: user.username,
          };
        }
      });

    return user;
  };

  return {
    ...guts,
    create,
    verify,
  };
};
