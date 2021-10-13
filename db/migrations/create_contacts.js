exports.up = (knex) => {
  return knex.schema.createTable("contacts", (t) => {
    t.increments("id").primary().unsigned();
    t.string("contact");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("contacts");
};
