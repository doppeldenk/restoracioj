const knex = require('../knex');

const { CONFIG } = require('../config/tableNames');

const Config = {

  getApiCredentials: () => {
    return knex(CONFIG)
      .first('value')
      .where('key', 'clientId')
      .then(({ value: clientId }) => {
        return knex(CONFIG)
          .first('value')
          .where('key', 'clientSecret')
          .then(({ value: clientSecret }) => {
            return { clientId, clientSecret };
          });
      });
  },

};

module.exports = Config;
