"use strict";

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "pswd",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "pswd",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
