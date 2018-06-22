const RestaurantsService = require('../../services/restaurants');
const { ERROR_RESTAURANT_NOT_FOUND } = require('../../utils/errorMessages');
const RESTAURANT = require('./restaurantObject');

const updateName = () => {
  RESTAURANT.name = 'Test' + new Date().getTime();
}

jest.setTimeout(30000);

describe('Delete restaurants', async () => {

  beforeEach(() => {
    updateName();
  });

  it('mark restaurant as deleted', async () => {
    try {
      const createdRestaurant = await RestaurantsService.create(RESTAURANT);
      await RestaurantsService.del(createdRestaurant.id);
      await RestaurantsService.read({ id: createdRestaurant.id });
    } catch (err) {
      expect(err.message).toBe(ERROR_RESTAURANT_NOT_FOUND);
    }
  });

  it('should attempt to mark a restaurant as deleted and fail', async () => {
    try {
      await RestaurantsService.del(-1);
    } catch (err) {
      expect(err.message).toBe(ERROR_RESTAURANT_NOT_FOUND);
    }
  });

});
