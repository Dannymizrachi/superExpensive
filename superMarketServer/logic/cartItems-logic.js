const cartItemsDao = require("../dao/cartItems-dao");

async function addItemToCart(product_id, amount, cartId, userId) {
  // product_price, product_id, amount

  await cartItemsDao.checkAmountFieldToAdd(product_id, amount, cartId, userId);
}

async function updateShoppingCartTotalPrice(cartId, userId) {
  await cartItemsDao.updateShoppingCartTotalPrice(cartId, userId);
}

async function deleteItemFromCart(product_id, amount, cartId) {
  // product_price, product_id, amount

  await cartItemsDao.deleteItemFromCart(product_id, amount, cartId);
}

async function getAllCartItems(cartId) {
  let usersCartItems = await cartItemsDao.getAllCartItems(cartId);
  return usersCartItems;
}

module.exports = {
  addItemToCart,
  updateShoppingCartTotalPrice,
  deleteItemFromCart,
  getAllCartItems,
};
