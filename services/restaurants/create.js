const {
  ERROR_EXISTING_RESTAURANT,
  ERROR_MISSING_CATEGORIES,
} = require('../../utils/errorMessages');
const RestaurantModel = require('../../models/Restaurant');

module.exports = async (fields) => {
  const { name, categories = [] } = fields;
  if (!name) throw ({ message: 'Missing name field' });

  const restaurant = await RestaurantModel.read({ name });
  if (restaurant.length) {
    throw ({
      message: ERROR_EXISTING_RESTAURANT,
    });
  }

  if (!categories.length) {
    throw ({
      message: ERROR_MISSING_CATEGORIES,
    });
  }

  const response = await RestaurantModel.create(fields);

  return response[0];
};
