const {
  ERROR_EXISTING_RESTAURANT,
  ERROR_RESTAURANT_NOT_FOUND,
} = require('../../utils/errorMessages');
const RestaurantModel = require('../../models/Restaurant');

module.exports = async (id, fields) => {
  const { name } = fields;

  const restaurantById = await RestaurantModel.read({ id });
  if (!restaurantById.length) {
    throw ({
      message: ERROR_RESTAURANT_NOT_FOUND,
      statusCode: 404,
    });
  }

  const restaurantByName = await RestaurantModel.read({ name });
  if (restaurantByName.length) {
    throw ({
      message: ERROR_EXISTING_RESTAURANT,
    });
  }

  const response = await RestaurantModel.update(id, fields);
  return response[0];
};
