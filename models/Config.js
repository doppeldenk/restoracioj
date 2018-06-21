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

  getAccessToken: () => (
    knex(CONFIG)
      .first('value as accesToken')
      .where('key', 'access_token')
      .then(row => row)
  ),

  createAccessToken: (token) => (
    knex(CONFIG)
      .where('key', 'access_token')
      .del()
      .then(() => (
        knex(CONFIG)
          .insert({
            key: 'access_token',
            value: token,
          })
      ))
  ),

};

module.exports = Config;
