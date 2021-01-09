const citiesDao = require("../dao/cities-dao");
//get all cities
async function getAllCities() {
  let allCities = await citiesDao.getAllCities();
  return allCities;
}

module.exports = { getAllCities };
