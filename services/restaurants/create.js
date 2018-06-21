const RestaurantModel = require('../../models/Restaurant');

module.exports = async (fields) => {
  const { name, categories = [] } = fields;
  if (!name) throw ({ message: 'Missing name field' });

  const restaurant = await RestaurantModel.read({ name });
  if (restaurant.length) {
    throw ({
      message: `Restaurant ${name} already exists`,
    });
  }

  if (!categories.length) {
    throw ({
      message: 'At least one category is required',
    });
  }

  const response = await RestaurantModel.create(fields);

  return response;
};
