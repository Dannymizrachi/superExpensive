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

module.exports = { insertShippingDetails };
