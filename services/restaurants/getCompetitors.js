const { getApiInstance } = require('../../utils/api');
const RestaurantModel = require('../../models/Restaurant');

module.exports = async (restaurantId) => {
  const restaurant = await RestaurantModel.read({
    id: restaurantId,
    deleted: false,
  });

  if (!restaurant.length) {
    throw ({
      message: 'Restaurant not found',
      statusCode: 404,
    });
  } else {
    const { lat, lng, categories } = restaurant[0];
    const point = `${lat},${lng}`;
    const api = await getApiInstance();
    const apiRestaurants = await api
      .get('/search/restaurants', {
        params: {
          country: 1,
          point: point,
        }
      })
      .then((apiResponse) => {
        return apiResponse.data;
      })
      .catch((error) => {
        const { status, statusText } = error.response;
        throw ({
          message: statusText,
          statusCode: status,
        });
      });

      const localCategories = categories.map(category => category.name);
      const competitors = [];
      for (let index in apiRestaurants.data) {
        const restaurant = apiRestaurants.data[index];
        const { allCategories } = restaurant;
        const apiRestaurantCategories = allCategories.split(',');
        const mergedCategories = [...localCategories, ...apiRestaurantCategories];
        const uniqueCategories = mergedCategories.filter((value, index, self) => self.indexOf(value) === index);
        if (uniqueCategories.length < mergedCategories.length) {
          competitors.push(restaurant);
          if (competitors.length === 3) {
            return competitors;
          }
        }
      }
  }
};
