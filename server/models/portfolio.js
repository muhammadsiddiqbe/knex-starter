"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Portfolio";
const tableName = "portfolios";

const selectableProps = ["id", "image", "link", "updated_at", "created_at"];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = async (props) => {
    return await guts.create(props);
  };

  const get = async (props) => {
    return await guts.findAll(props);
  };

  return {
    ...guts,
    create,
    get,
  };
};
