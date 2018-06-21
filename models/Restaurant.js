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

const MAX_ROWS = 5;
const OFFSET = 0;

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

  read: (filters = {}, fields = selectedFields) => {
    const filteredFilters = pick(filters, selectedFields);
    const { max: selectedMax, offset: selectedOffset } = filters;
    const max = selectedMax || MAX_ROWS;
    const offset = selectedOffset || OFFSET;

    return knex(RESTAURANTS)
      .select(fields)
      .where(filteredFilters)
      .limit(max)
      .offset(offset)
      .map((row) => (attachCategories(row)))
  },

  findByName: (name) => (
    knex(RESTAURANTS)
      .select(selectedFields)
      .where('name', 'like', `%${name}%`)
      .map((row) => (attachCategories(row)))
  ),

  findByCategory: (categoryId) => {
    const restaurantFields = selectedFields.map(field => `${RESTAURANTS}.${field}`);
    return knex(RESTAURANTS)
      .select(restaurantFields)
      .innerJoin(RESTAURANT_CATEGORIES, `${RESTAURANTS}.id`, `${RESTAURANT_CATEGORIES}.restaurant_id`)
      .where(`${RESTAURANT_CATEGORIES}.category_id`, categoryId)
      .map((row) => (attachCategories(row)))
  },

  update: (id, fields) => {
    const filteredFields = pick(fields, allowedForUpdate);
    const { categories: categoriesIds } = fields;
    return knex(RESTAURANTS)
      .where({ id })
      .update(filteredFields)
      .then(() => {
        if (categoriesIds && categoriesIds.length) {
          return knex(RESTAURANT_CATEGORIES)
            .where('restaurant_id', id)
            .del()
            .then(() => {
              const categories = categoriesIds.map(categoryId => ({
                restaurant_id: id,
                category_id: categoryId,
              }));
              return knex(RESTAURANT_CATEGORIES)
                .insert(categories)
                .then(() => Restaurant.read({ id }));
            });
        } else {
          return Restaurant.read({ id });
        }
      });
  },

  del: id => (
    knex(RESTAURANTS)
      .where({ id })
      .update({ deleted: true })
  ),

};

const attachCategories = row => (
  knex(CATEGORIES)
    .select([
      `${CATEGORIES}.id`,
      `${CATEGORIES}.name`,
      `${CATEGORIES}.description`,
    ])
    .innerJoin(RESTAURANT_CATEGORIES, `${CATEGORIES}.id`, `${RESTAURANT_CATEGORIES}.category_id`)
    .where(`${RESTAURANT_CATEGORIES}.restaurant_id`, row.id)
    .then(categories => ({ ...row, categories }))
);

module.exports = Restaurant;
