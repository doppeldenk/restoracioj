const RestaurantModel = require('../../models/Restaurant');

module.exports = async (filters) => {
  const { id, name, categoryId } = filters;
  let response;

  if (name) {
    response = await RestaurantModel.findByName(name);
  } else if (categoryId) {
    response = await RestaurantModel.findByCategory(categoryId);
  } else {
    response = await RestaurantModel.read({
      ...filters,
      deleted: false,
    });
  }

  if (id) {
    if (!response.length) {
      throw ({
        message: 'Restaurant not found',
        statusCode: 404,
      });
    } else {
      response = response[0];
    }
  }

  return response;
};
