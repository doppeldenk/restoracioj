const axios = require('axios');

const { apiURL } = require('../config/api');
const ConfigModel = require('../models/Config');

const getAccessToken = async () => {
  let { accessToken } = await ConfigModel.getAccessToken();
  if (!accessToken) {
    const { clientId, clientSecret } = await ConfigModel.getApiCredentials();
    accessToken = await axios
      .get(`${apiURL}/tokens`, {
        params: { clientId, clientSecret },
      })
      .then(response => response.data.access_token)
      .catch((err) => {
        throw ({ message: JSON.stringify(err) });
      });
    await ConfigModel.createAccessToken(accessToken);
  }
  return accessToken;
};

const getApiInstance = async () => {
  const accessToken = await getAccessToken();
  const instance = axios.create({
    baseURL: apiURL,
    headers: {
      'Authorization': accessToken,
    }
  });
  return instance;
};

module.exports = {
  getApiInstance,
};
