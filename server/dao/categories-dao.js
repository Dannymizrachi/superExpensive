const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

//get all categories
async function getAllCategories() {
  let sql = "SELECT id,category_name from shufersal.categories";
  let allCategories;
  try {
    allCategories = await connection.execute(sql);
    return allCategories;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}
module.exports = { getAllCategories };
