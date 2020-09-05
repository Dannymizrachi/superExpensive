const cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
let cacheModule = require("../dao/cache-module");
const { request, response } = require("express");
const errorHandler = require("../errors/error-handler");

const router = express.Router();

router.post("/addToCart", async (request, response, next) => {
  let cartItem = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);

  let userData = cacheModule.get(token);

  console.log(userData);
  let cartId = userData.cart_id;
  let userId = userData.user_id;
  // console.log(cartId);
  try {
    await cartItemsLogic.addItemToCart(
      cartItem.id,
      cartItem.amount,
      cartId,
      userId
    );
    await cartItemsLogic.updateShoppingCartTotalPrice(cartId, userId);
    response.json();
  } catch (err) {
    console.error(err);
    response.status(600).send(error.message);
  }
});
router.post("/deleteItem", async (request, response, next) => {
  let cartItem = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);

  let userData = cacheModule.get(token);

  console.log(cartItem);
  let cartId = userData.cart_id;
  let userId = userData.user_id;
  // console.log(cartId);
  try {
    await cartItemsLogic.deleteItemFromCart(
      cartItem.id,
      cartItem.amount,
      cartId
    );
    await cartItemsLogic.updateShoppingCartTotalPrice(cartId, userId);
    response.json();
  } catch (err) {
    console.error(err);
    response.status(600).send(error.message);
  }
});
router.get("/", async (request, response) => {
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = cacheModule.get(token);
  console.log(userData);
  let cartId = userData.cart_id;
  try {
    let usersCart = await cartItemsLogic.getAllCartItems(cartId);
    response.json(usersCart);
  } catch (err) {
    console.error(err);
    response.status(600).send(error.message);
  }
});

module.exports = router;
