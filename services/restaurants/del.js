const RestaurantModel = require('../../models/Restaurant');

module.exports = async (id) => {
  const restaurantById = await RestaurantModel.read({ id });
  if (!restaurantById.length) {
    throw ({
      message: 'Restaurant not found',
    });
  }
  const response = await RestaurantModel.del(id);
  return response;
};
