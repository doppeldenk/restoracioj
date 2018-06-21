const { CONFIG } = require('../config/tableNames');

exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable(CONFIG, (table) => {
      table.string('key').notNullable();
      table.string('value').notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable(CONFIG),
  ])
);
