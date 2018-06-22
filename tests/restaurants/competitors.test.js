const RestaurantsService = require('../../services/restaurants');
const { handleError } = require('../../utils/errorHandler');
const RESTAURANT = require('./restaurantObject');
const updateName = () => {
  RESTAURANT.name = 'Test' + new Date().getTime();
}

jest.setTimeout(30000);

describe('Get competitors', async () => {

  beforeEach(() => {
    updateName();
  });

  it('should return competitors based on a restaurant ID', async () => {
    let competitors;
    try {
      const createdRestaurant = await RestaurantsService.create(RESTAURANT);
      competitors = await RestaurantsService.getCompetitors(createdRestaurant.id);
    } catch (err) {
      handleError(err);
    }

    expect(competitors).toBeDefined();
    expect(typeof competitors).toBe('object');
    expect(competitors.length).toBeGreaterThan(0);
  });

});
