"use strict";

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // port: process.env.DATABASE_PORT,
      host: "satao.db.elephantsql.com",
      database: "osgrowfu",
      user: "osgrowfu",
      password: "UVZZYPxDMZIP7OfDfWy2Jy8MzhHaKe4f",
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
      password: "postgres",
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
      database: "postgres",
      user: "postgres",
      password: "postgres",
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
