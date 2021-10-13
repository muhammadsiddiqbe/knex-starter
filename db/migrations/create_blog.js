exports.up = (knex) => {
  return knex.schema.createTable("blogs", (t) => {
    t.increments("id").primary().unsigned();
    t.string("password");
    t.string("titles", 2048);
    t.string("summary");
    t.json("body");
    t.string("tags");
    t.boolean("deleted").defaultTo(false);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("blogs");
};
