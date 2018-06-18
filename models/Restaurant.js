const pick = require('object.pick');
const knex = require('../knex');
const {
  RESTAURANTS,
  RESTAURANT_CATEGORIES,
  CATEGORIES,
} = require('../config/tableNames');

const selectedFields = [
  'id',
  'name',
  'description',
  'opening_time',
  'closing_time',
  'phone',
  'lat',
  'lng',
];

const allowedForUpdate = [
  'name',
  'description',
  'opening_time',
  'closing_time',
  'phone',
  'lat',
  'lng',
];

const Restaurant = {

  create: (fields) => {
    const filteredFields = pick(fields, selectedFields);
    const { categories: categoriesIds } = fields;

    return knex(RESTAURANTS)
      .insert(filteredFields)
      .returning('id')
      .then(([insertedId]) => {
        const categories = categoriesIds.map(categoryId => ({
          restaurant_id: insertedId,
          category_id: categoryId,
        }));

        return knex(RESTAURANT_CATEGORIES)
          .insert(categories)
          .then(() => Restaurant.read({ id: insertedId }));
      });
  },

  read: (filters = {}, fields = selectedFields) => (
    knex(RESTAURANTS)
      .select(fields)
      .where(filters)
      .map((row) => (
        knex(CATEGORIES)
          .select([
            `${CATEGORIES}.id`,
            `${CATEGORIES}.name`,
            `${CATEGORIES}.description`,
          ])
          .innerJoin(RESTAURANT_CATEGORIES, `${CATEGORIES}.id`, `${RESTAURANT_CATEGORIES}.category_id`)
          .where(`${RESTAURANT_CATEGORIES}.restaurant_id`, row.id)
          .then(categories => ({ ...row, categories }))
      ))
  ),

  update: (fields, id) => {
    const filteredFields = pick(fields, allowedForUpdate);
    return knex(RESTAURANTS)
      .where({ id })
      .update(filteredFields)
      .then(() => (
        knex(RESTAURANTS)
          .select(selectedFields)
          .where({ id })
          .then(rows => rows[0])
      ));
  },

  del: id => (
    knex(RESTAURANTS)
      .where({ id })
      .update({ deleted: true })
  ),

};

module.exports = Restaurant;
