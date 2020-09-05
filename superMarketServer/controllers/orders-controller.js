const express = require("express");
let cacheModule = require("../dao/cache-module");
const ordersLogic = require("../logic/orders-logic");
const router = express.Router();

router.post("/", async (request, response, next) => {
  let shippingDetails = request.body;
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);

  let userData = cacheModule.get(token);
  let userId = userData.user_id;
  console.log(userId);

  let shippingCity = shippingDetails.shippingCity;
  let shippingStreet = shippingDetails.shippingStreet;
  let shippingDate = shippingDetails.shippingDate;
  let CreditCard = shippingDetails.CreditCard;

  try {
    await ordersLogic.insertShippingDetails(
      shippingCity,
      shippingStreet,
      shippingDate,
      CreditCard,
      userId
    );
    response.json();
  } catch (err) {
    console.log("Failed to insert shipping details.");
    return next(err);
  }
});

router.get("/order-info", async (request, response, next) => {
  let authorizationString = request.headers["authorization"];
  let token = authorizationString.substring("Bearer ".length);

  let userData = cacheModule.get(token);
  let cartID = userData.cart_id;
  console.log(cartID);

  try {
    
    let orderInfo = await ordersLogic.getOrderInfo(
      cartID
    );
    response.json(orderInfo);
  } catch (err) {
    console.log("Failed to insert shipping details.");
    return next(err);
  }
});

module.exports = router;
