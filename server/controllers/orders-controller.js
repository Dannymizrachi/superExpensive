const express = require("express");
const cacheModule = require("../dao/cache-module");
const ordersLogic = require("../logic/orders-logic");
const router = express.Router();
//  post shipping details
router.post("/", async (request, response, next) => {
  let shippingDetails = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);
  let userData = cacheModule.get(token);
  let userId = userData.user_id;
  let cartId = userData.cart_id;
  let shippingCity = shippingDetails.shippingCity;
  let shippingStreet = shippingDetails.shippingStreet;
  let shippingDate = shippingDetails.shippingDate;
  let CreditCard = shippingDetails.CreditCard;

  try {
    let newCartId = await ordersLogic.insertShippingDetails(
      shippingCity,
      shippingStreet,
      shippingDate,
      CreditCard,
      cartId,
      userId
    );
    userData.cart_id = newCartId;
    cacheModule.set(token, userData);
    response.json();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
