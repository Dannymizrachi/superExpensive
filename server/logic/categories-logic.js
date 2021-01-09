const categoriesDao = require("../dao/categories-dao");
//get all categories
async function getAllCategories() {
  let allCategories = await categoriesDao.getAllCategories();
  return allCategories;
}

module.exports = { getAllCategories };
