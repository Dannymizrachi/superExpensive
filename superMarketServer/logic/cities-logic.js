const citiesDao = require("../dao/cities-dao");

async function getAllCities() {
  let allCities = await citiesDao.getAllCities();
  return allCities;
}

module.exports = { getAllCities };
