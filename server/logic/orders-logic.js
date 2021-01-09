const ordersDao = require("../dao/orders-dao");
//insert order's shipping details
async function insertShippingDetails(
  shippingCity,
  shippingStreet,
  ShippingDate,
  CreditCard,
  cartId,
  userId
) {
  let newCartId = await ordersDao.insertShippingDetails(
    shippingCity,
    shippingStreet,
    ShippingDate,
    CreditCard,
    cartId,
    userId
  );
  return newCartId;
}

module.exports = { insertShippingDetails };
