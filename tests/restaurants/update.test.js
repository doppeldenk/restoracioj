const RestaurantsService = require('../../services/restaurants');
const { handleError } = require('../../utils/errorHandler');
const {
  ERROR_RESTAURANT_NOT_FOUND,
  ERROR_EXISTING_RESTAURANT,
} = require('../../utils/errorMessages');
const RESTAURANT = require('./restaurantObject');

const updateName = () => {
  RESTAURANT.name = 'Test' + new Date().getTime();
}

jest.setTimeout(30000);

describe('Update restaurants', async () => {

  beforeEach(() => {
    updateName();
  });

  it('should update restaurant and return restaurant object', async () => {
    let updatedRestaurant;
    try {
      const createdRestaurant = await RestaurantsService.create(RESTAURANT);
      updateName();
      updatedRestaurant = await RestaurantsService.update(createdRestaurant.id, { name: RESTAURANT.name });
    } catch (err) {
      handleError(err);
    }
    expect(updatedRestaurant).toBeDefined();
    expect(typeof updatedRestaurant).toBe('object');
    expect(updatedRestaurant.name).toBe(RESTAURANT.name);
  });

  it('should attempt to update an unexisting restaurant and fail', async () => {
    try {
      await RestaurantsService.update(-1, {});
    } catch (err) {
      expect(err.message).toBe(ERROR_RESTAURANT_NOT_FOUND);
    }
  });

  it('should attempt to update a restaurant using an existing name and fail', async () => {
    try {
      await RestaurantsService.create(RESTAURANT);
      const existingName = RESTAURANT.name;
      updateName();
      const createdRestaurant = await RestaurantsService.create(RESTAURANT);
      await RestaurantsService.update(createdRestaurant.id, { name: existingName });
    } catch (err) {
      expect(err.message).toBe(ERROR_EXISTING_RESTAURANT);
    }
  });

});
