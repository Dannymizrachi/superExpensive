const express = require("express");
const usersCache = require("../dao/cache-module");
const productsLogic = require("../logic/products-logic");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let ProductsList = await productsLogic.getAllProducts();
    response.json(ProductsList);
  } catch (err) {
    // return next(error);
    console.log("Failed to get products");
    console.error(err);
    response.status(600).send(error.message);
  }
});

// router.post("/", async (request, response, next) => {

//   let authorizationString = request.headers["authorization"];
//   let token = authorizationString.substring("Bearer ".length);
//   let userData = usersCache.get(token);
//   let ProductID = request.body;

//   try {
//       let cartItems = await cartItemsLogic.pullProductItem(ProductID);
//       response.json(cartItems);
//   }
//   catch (err) {
//       // return next(error);
//       console.error(err);
//       response.status(600).send(error.message);
//   }
// });

router.post("/", async (request, response, next) => {
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = usersCache.get(token);
  let productDetails = request.body;

  try {
    let product = await productsLogic.addProduct(productDetails);
    response.json(product);
  } catch (err) {
    // return next(error);
    console.error(err);
    response.status(600).send(error.message);
  }
});

module.exports = router;
