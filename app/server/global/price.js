const axios = require('axios');

// global.prices = require('../api/steam/backup/prices.json');
global.haha = 123;

async function getPrices() {
  const url = 'https://prices.csgotrader.app/latest/prices_v6.json';
  return axios
    .get(url)
    .then(function (response) {
      if (typeof response === 'object' && response !== null) {
        console.log(
          'prices, response',
          typeof response === 'object',
          response !== null
        );
        global.prices = response.data;
        global.haha = 234;
        return response.data;
      }
    })
    .catch(function (error) {
      console.log('Error prices', error);
    });
}

module.exports = {
  getPrices
}
