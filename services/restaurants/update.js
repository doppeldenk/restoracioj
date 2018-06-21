const RestaurantModel = require('../../models/Restaurant');

module.exports = async (id, fields) => {
  const { name } = fields;

  const restaurantById = await RestaurantModel.read({ id });
  if (!restaurantById.length) {
    throw ({
      message: 'Restaurant not found',
      statusCode: 404,
    });
  }

  const restaurantByName = await RestaurantModel.read({ name });
  if (restaurantByName.length) {
    throw ({
      message: `Restaurant ${name} already exists`,
    });
  }

  const response = await RestaurantModel.update(id, fields);
  return response;
};
