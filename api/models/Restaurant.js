const pick = require('object.pick');
const knex = require('../knex');
const { RESTAURANTS: TABLE } = require('../config/tableNames');

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
    return knex(TABLE)
      .insert(filteredFields)
      .then(insertedIds => (
        knex(TABLE)
          .select(selectedFields)
          .where('id', insertedIds[0])
          .then(rows => rows)
      ));
  },

  read: (filters = {}, fields = selectedFields) => (
    knex(TABLE)
      .select(fields)
      .where(filters)
      .then(rows => rows)
  ),

  update: (fields, id) => {
    const filteredFields = pick(fields, allowedForUpdate);
    return knex(TABLE)
      .where({ id })
      .update(filteredFields)
      .then(() => (
        knex(TABLE)
          .select(selectedFields)
          .where({ id })
          .then(rows => rows[0])
      ));
  },

  del: id => (
    knex(TABLE)
      .where({ id })
      .update({ deleted: true })
  ),

};

module.exports = Restaurant;
