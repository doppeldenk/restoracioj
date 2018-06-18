const RestaurantModel = require('../../models/Restaurant');

const create = async (fields) => {
  const { name, categories = [] } = fields;
  if (!name) throw new Error('Missing name field');

  const restaurant = await RestaurantModel.read({ name });
  if (restaurant.length) {
    throw new Error(`Restaurant ${name} already exists`);
  }

  if (!categories.length) {
    throw new Error(`At least one category is required`);
  }

  const response = await RestaurantModel.create(fields);

  return response;
};

const read = async (filters) => {
  const response = await RestaurantModel.read({
    ...filters,
    deleted: false,
  });

  return response;
};

const update = async (filters) => {
  const response = await RestaurantModel.read({
    ...filters,
    deleted: false,
  });

  return response;
};

const del = async (filters) => {
  const response = await RestaurantModel.read({
    ...filters,
    deleted: false,
  });

  return response;
};

module.exports = {
  create,
  read,
  update,
  del,
};