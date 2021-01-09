const cartItemsLogic = require("../logic/cartItems-logic");
const express = require("express");
const cacheModule = require("../dao/cache-module");
const router = express.Router();

//add item to cart
router.post("/addToCart", async (request, response, next) => {
  let cartItem = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = cacheModule.get(token);
  let cartId = userData.cart_id;
  let userId = userData.user_id;
  try {
    await cartItemsLogic.addItemToCart(
      cartItem.product_id,
      cartItem.amount,
      cartId,
      userId
    );
    await cartItemsLogic.updateShoppingCartTotalPrice(cartId, userId);
    response.json();
  } catch (err) {
    return next(err);
  }
});

//delete itam from cart
router.post("/deleteItem", async (request, response, next) => {
  let cartItem = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = cacheModule.get(token);
  let cartId = userData.cart_id;
  let userId = userData.user_id;

  try {
    await cartItemsLogic.deleteItemFromCart(
      cartItem.product_id,
      cartItem.amount,
      cartId
    );
    await cartItemsLogic.updateShoppingCartTotalPrice(cartId, userId);
    response.json();
  } catch (err) {
    return next(err);
  }
});

//get all users cart items
router.get("/", async (request, response) => {
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = cacheModule.get(token);
  let cartId = userData.cart_id;
  let userId = userData.user_id;
  try {
    let usersCart = await cartItemsLogic.getAllCartItems(cartId, userId);
    response.json(usersCart);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
