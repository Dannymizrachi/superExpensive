const express = require("express");

const categoriesLogic = require("../logic/categories-logic");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let categoriesList = await categoriesLogic.getAllCategories();
    response.json(categoriesList);
  } catch (err) {
    console.log("Failed to get categories");
    return next(err);
  }
});

module.exports = router;
