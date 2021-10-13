exports.up = (knex) => {
  return knex.schema.createTable("briefs", (t) => {
    t.increments("id").primary().unsigned();
    t.string("files");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("briefs");
};
