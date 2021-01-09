const express = require("express");
const productsLogic = require("../logic/products-logic");
const router = express.Router();

//get all products
router.get("/", async (request, response, next) => {
  try {
    let ProductsList = await productsLogic.getAllProducts();
    response.json(ProductsList);
  } catch (error) {
    return next(error);
  }
});

//edit a product
router.post("/edit-product", async (request, response, next) => {
  let productDetails = request.body;
  try {
    await productsLogic.editProduct(productDetails);
    response.json();
  } catch (error) {
    return next(error);
  }
});

//add a product
router.post("/", async (request, response, next) => {
  let productDetails = request.body;
  try {
    await productsLogic.addProduct(productDetails);
    response.json();
  } catch (error) {
    return next(error);
  }
});
//delete a product
router.post("/delete-product", async (request, response, next) => {
  let productDetails = request.body;
  let productId = productDetails.product_id;
  console.log(productDetails);
  console.log(productId);
  try {
    await productsLogic.deleteProduct(productId);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
