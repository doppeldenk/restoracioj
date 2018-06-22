const RestaurantsService = require('../../services/restaurants');
const { handleError } = require('../../utils/errorHandler');
const {
  ERROR_EXISTING_RESTAURANT,
  ERROR_MISSING_CATEGORIES,
} = require('../../utils/errorMessages');
const RESTAURANT = require('./restaurantObject');

const updateName = () => {
  RESTAURANT.name = 'Test' + new Date().getTime();
}

jest.setTimeout(30000);

describe('Create restaurant', async () => {

  beforeEach(() => {
    updateName();
  });

  it('should create restaurant and return the restaurant object', async () => {
    let restaurant;
    try {
      restaurant = await RestaurantsService.create(RESTAURANT);
    } catch (err) {
      handleError(err);
    }

    expect(restaurant).toBeDefined();
    expect(typeof restaurant).toBe('object');
    expect(restaurant.name).toBe(RESTAURANT.name);
  });

  it('should attempt to create a restaurant with an existing name and fail', async () => {
    try {
      await RestaurantsService.create(RESTAURANT);
      await RestaurantsService.create(RESTAURANT);
    } catch (err) {
      expect(err.message).toBe(ERROR_EXISTING_RESTAURANT);
    }
  });

  it('should attempt to create a restaurant without categories and fail', async () => {
    let _RESTAURANT = {...RESTAURANT};
    _RESTAURANT.categories = [];
    try {
      await RestaurantsService.create(_RESTAURANT);
    } catch (err) {
      expect(err.message).toBe(ERROR_MISSING_CATEGORIES);
    }

  });

});
