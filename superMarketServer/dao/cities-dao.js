let connection = require("./connection-wrapper");
async function getAllCities() {
  let sql = "SELECT id,city_name from shufersal.cities";

  let allProducts;
  allProducts = await connection.execute(sql);
  console.log("result:" + JSON.stringify(allProducts));

  console.log("All good ! ");
  return allProducts;
}
module.exports = { getAllCities };
