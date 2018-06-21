const { handleError } = require('../utils/errorHandler');
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
  let {
    query : filters,
    params: { id },
  } = ctx;

  if (id) {
    filters = { id };
  }

  try {
    const response = await RestaurantsService.read(filters);
    ctx.body = response;
  } catch (err) {
    handleError(err, ctx);
  }
};

const getCompetitors = async (ctx) => {
  const { params: { id } } = ctx;

  try {
    const response = await RestaurantsService.getCompetitors(id);
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
    const response = await RestaurantsService.update(id, fields);
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
    const response = await RestaurantsService.del(id);
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
  getCompetitors,
};
