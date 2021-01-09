const cartItemsDao = require("../dao/cartItems-dao");

//add item to cart
async function addItemToCart(product_id, amount, cartId, userId) {
  await cartItemsDao.checkAmountFieldToAdd(product_id, amount, cartId, userId);
}

//update the shopping cart total
async function updateShoppingCartTotalPrice(cartId, userId) {
  await cartItemsDao.updateShoppingCartTotalPrice(cartId, userId);
}
//delete item from users cart
async function deleteItemFromCart(product_id, amount, cartId) {
  await cartItemsDao.deleteItemFromCart(product_id, amount, cartId);
}
//get all useres cart items
async function getAllCartItems(cartId, userId) {
  let usersCartItems = await cartItemsDao.getAllCartItems(cartId, userId);
  return usersCartItems;
}

module.exports = {
  addItemToCart,
  updateShoppingCartTotalPrice,
  deleteItemFromCart,
  getAllCartItems,
};
