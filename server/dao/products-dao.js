const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

//get all pruoducts
async function getAllProducts() {
  let sql = `SELECT 
    products.id as product_id,
    product_name,
    unit_price,
    categories.category_name,
    categories.id as category_id,
    description,
    img_src
    
   from 
    shufersal.products
   join 
    categories
   where
    products.category = categories.id`;
  try {
    let allProducts = await connection.execute(sql);
    return allProducts;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

//add a product
async function addProduct(productDetails) {
  let sql =
    "INSERT INTO products set product_name =?, unit_price=?, category = (select id from categories where category_name=?), description=?, img_src =?";
  let parameters = [
    productDetails.product_name,
    productDetails.unit_price,
    productDetails.category_name,
    productDetails.description,
    productDetails.img_src,
  ];
  console.log(productDetails);
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

//edit product
async function editProduct(productDetails) {
  console.log(productDetails);
  let sql = `update
  products 
  set 
  product_name =?,
  unit_price = ?,
  category = (select id from categories where category_name=?),
  description = ?,
  img_src=?
  where
  id = ?`;
  let parameters = [
    productDetails.product_name,
    productDetails.unit_price,
    productDetails.category_name,
    productDetails.description,
    productDetails.img_src,
    productDetails.product_id,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}
//delete product
async function deleteProduct(productId) {
  console.log(productId);
  let sql = `delete from products where id =?`;
  let parameters = [productId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}
async function checkItemInCarts(productId) {
  let sql = "select id from cart_items where product_id =?";
  let parameters = [productId];
  try {
    let itemsInCarts = await connection.executeWithParameters(sql, parameters);
    return itemsInCarts;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function deleteProductFromCarts(productId) {
  let sql = "delete from cart_items where product_id=?";
  let parameters = [productId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  checkItemInCarts,
  deleteProductFromCarts,
};
