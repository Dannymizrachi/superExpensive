const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

//get all cities
async function getAllCities() {
  let sql = "SELECT id,city_name from shufersal.cities";
  try {
    let allCities = await connection.execute(sql);
    return allCities;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}
module.exports = { getAllCities };
