const ordersDao = require("../dao/orders-dao");

async function insertShippingDetails(
  shippingCity,
  shippingStreet,
  ShippingDate,
  CreditCard,
  userId
) {
  await ordersDao.insertShippingDetails(
    shippingCity,
    shippingStreet,
    ShippingDate,
    CreditCard,
    userId
  );
}

async function getOrderInfo(cartID){
  let orderDetails = await ordersDao.getOrderInfo(cartID);
  return orderDetails;
}

module.exports = { insertShippingDetails, getOrderInfo };
