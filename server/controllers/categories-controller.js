const express = require("express");
const categoriesLogic = require("../logic/categories-logic");
const router = express.Router();

//get all categories
router.get("/", async (request, response) => {
  try {
    let categoriesList = await categoriesLogic.getAllCategories();
    response.json(categoriesList);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
