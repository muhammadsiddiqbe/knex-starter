exports.up = (knex) => {
  return knex.schema.createTable("portfolios", (t) => {
    t.increments("id").primary().unsigned();
    t.string("image", 2048);
    t.string("link", 2048);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("portfolios");
};
