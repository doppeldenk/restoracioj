const { RESTAURANTS } = require('../config/tableNames');

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable(RESTAURANTS, (table) => {
      table.increments('id').primary().notNullable();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.time('opening_time').notNullable();
      table.time('closing_time').notNullable();
      table.integer('phone').notNullable();
      table.string('lat').notNullable();
      table.string('lng').notNullable();
      table.timestamps(false, true);
    }),
  ])
);


exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable(RESTAURANTS),
  ])
);
