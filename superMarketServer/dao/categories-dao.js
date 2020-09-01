let connection = require("./connection-wrapper");
async function getAllCategories() {
  let sql = "SELECT id,category_name from shufersal.categories";

  let allCategories;
  allCategories = await connection.execute(sql);
  console.log("result:" + JSON.stringify(allCategories));

  console.log("All good ! ");
  return allCategories;
}
module.exports = { getAllCategories };
