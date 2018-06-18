const { RESTAURANT_CATEGORIES, RESTAURANTS, CATEGORIES } = require('../config/tableNames');

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable(RESTAURANT_CATEGORIES, (table) => {
      table.increments('id').primary().notNullable();
      table.integer('restaurant_id').references(`${RESTAURANTS}.id`).notNullable();
      table.integer('category_id').references(`${CATEGORIES}.id`).notNullable();
    }),
  ])
);


exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable(RESTAURANT_CATEGORIES),
  ])
);
