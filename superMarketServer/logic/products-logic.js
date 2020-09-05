const productsDao = require("../dao/products-dao");

async function getAllProducts() {
  let allProducts = await productsDao.getAllProducts();
  return allProducts;
}
async function pullProductItem(ProductID) {
  let cartItems = await cartItemsDao.pullProductItem(ProductID.productId);
  return cartItems;
}

async function addProduct(productDetails) {
  await productsDao.addProduct(productDetails);
}

async function editProduct(productDetails) {
  await productsDao.editProduct(productDetails);
}

module.exports = { getAllProducts, pullProductItem, addProduct, editProduct };
