const { handleError } = require('../utils/errorHandler');
const RestaurantModel = require('../models/Restaurant');
const RestaurantsService = require('../services/restaurants');

const create = async (ctx) => {
  const {
    request: {
      body: fields,
    },
  } = ctx;

  try {
    const response = await RestaurantsService.create(fields);
    ctx.status = 201;
    ctx.body = response;
  } catch (err) {
    handleError(err, ctx);
  }
};

const read = async (ctx) => {
  const { query: filters } = ctx;

  try {
    const response = await RestaurantsService.read(filters);
    ctx.body = response;
  } catch (err) {
    handleError(err, ctx);
  }
};

const update = async (ctx) => {
  const {
    request: { body: fields },
    params: { id },
  } = ctx;

  try {
    const response = await RestaurantModel.update(fields, id);
    ctx.body = response;
  } catch (err) {
    handleError(err, ctx);
  }
};

const del = async (ctx) => {
  const {
    params: { id },
  } = ctx;

  try {
    const response = await RestaurantModel.del(id);
    ctx.status = 204;
    ctx.body = response;
  } catch (err) {
    handleError(err, ctx);
  }
};

module.exports = {
  create,
  read,
  update,
  del,
};
