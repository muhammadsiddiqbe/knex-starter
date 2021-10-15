"use strict";

module.exports = ({
  knex = {},
  name = "name",
  tableName = "tablename",
  selectableProps = [],
  timeout = 1000,
}) => {
  const create = (props) => {
    delete props.id; // not allowed to set `id`

    return knex
      .insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  // .offset((offset - 1) * limit)

  const findAll = ({ offset = 1, limit = 1000 }) => {
    console.log(offset, limit);
    return knex
      .select(selectableProps)
      .from(tableName)
      .offset((offset - 1) * limit)
      .limit(limit)
      .timeout(timeout);
  };

  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = (id) =>
    knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout);

  const update = (id, props) => {
    delete props.id; // not allowed to set `id`

    return knex
      .update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = (id) =>
    knex.del().from(tableName).where({ id }).timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
  };
};
