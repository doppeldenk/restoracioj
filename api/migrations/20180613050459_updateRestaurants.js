const { RESTAURANTS } = require('../config/tableNames');

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table(RESTAURANTS, (table) => {
      table.boolean('deleted').notNullable().defaultTo(false);
    }),
  ])
);


exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table(RESTAURANTS, (table) => {
      table.dropColumn('deleted');
    }),
  ])
);
