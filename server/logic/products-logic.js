const productsDao = require("../dao/products-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

//get all products
async function getAllProducts() {
  let allProducts = await productsDao.getAllProducts();
  return allProducts;
}
//add a product
async function addProduct(productDetails) {
  await productsDao.addProduct(productDetails);
}

//edit a product
async function editProduct(productDetails) {
  await productsDao.editProduct(productDetails);
}
//delete product
async function deleteProduct(productId) {
  let product = await productsDao.checkItemInCarts(productId);
  if (product.length > 0) {
    await productsDao.deleteProductFromCarts(productId);
    await productsDao.deleteProduct(productId);
  }
  await productsDao.deleteProduct(productId);
}

module.exports = {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
