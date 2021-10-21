exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary().unsigned();
    t.string("username").unique().index().notNull();
    t.string("password").notNull();
    t.string("picture");
    t.boolean("deleted").defaultTo(false);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
