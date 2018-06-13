const { CATEGORIES } = require('../config/tableNames');

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable(CATEGORIES, (table) => {
      table.increments('id').primary().notNullable();
      table.string('name').notNullable();
      table.string('description');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable(CATEGORIES),
  ])
);
