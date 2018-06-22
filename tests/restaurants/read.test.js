const RestaurantsService = require('../../services/restaurants');
const { handleError } = require('../../utils/errorHandler');
const {
  ERROR_RESTAURANT_NOT_FOUND,
} = require('../../utils/errorMessages');
const RESTAURANT = require('./restaurantObject');

const updateName = () => {
  RESTAURANT.name = 'Test' + new Date().getTime();
}

jest.setTimeout(30000);

describe('Read restaurants', async () => {

  beforeEach(() => {
    updateName();
  });

  it('should load restaurants', async () => {
    let restaurants;
    try {
      await RestaurantsService.create(RESTAURANT);
      restaurants = await RestaurantsService.read();
    } catch (err) {
      handleError(err);
    }
    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
  });

  it('should find restaurants by name when passed "name" param', async () => {
    let restaurants;
    try {
      await RestaurantsService.create(RESTAURANT);
      restaurants = await RestaurantsService.read({ name: 'Test'});
    } catch (err) {
      handleError(err);
    }
    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
  });

  it('should find restaurants by category when passed "categoryId" param', async () => {
    let restaurants;
    try {
      await RestaurantsService.create(RESTAURANT);
      restaurants = await RestaurantsService.read({ categoryId: 3 });
    } catch (err) {
      handleError(err);
    }
    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
  });

  it('should attempt to find an unexisting restaurant and fail', async () => {
    try {
      await RestaurantsService.read({ id: -1 });
    } catch (err) {
      expect(err.message).toBe(ERROR_RESTAURANT_NOT_FOUND);
    }
  });

  it('should return a restaurant object whent passed a valid "id" param', async () => {
    let restaurant;
    try {
      const createdRestaurant = await RestaurantsService.create(RESTAURANT);
      restaurant = await RestaurantsService.read({ id: createdRestaurant.id });
    } catch (err) {
      handleError(err);
    }

    expect(restaurant).toBeDefined();
    expect(restaurant.name).toBe(RESTAURANT.name);
  });

});
