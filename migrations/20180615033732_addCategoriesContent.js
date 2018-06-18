const { CATEGORIES } = require('../config/tableNames');
const categoriesList = require('../utils/categories.json');

exports.up = (knex, Promise) => (
  Promise.all([
    knex(CATEGORIES).insert(categoriesList)
  ])
);


exports.down = (knex, Promise) => (
  Promise.all([
    knex(CATEGORIES).truncate()
  ])
);
