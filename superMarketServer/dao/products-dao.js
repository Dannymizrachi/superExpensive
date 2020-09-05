let connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getAllProducts() {
  let sql = `SELECT 
    products.id as product_id,
    product_name,
    unit_price,
    categories.category_name as category_name,
    description,
    categories.id as category_id 
   from 
    shufersal.products
   join 
    categories
   where
    products.category = categories.id`;

  let allProducts;
  allProducts = await connection.execute(sql);

  return allProducts;
}

async function pullProductItem(ProductID) {
  let sql = "select product_name ,unit_price from products where id =?";
  let parameters = [ProductID];
  console.log(ProductID);
  try {
    let productItem = await connection.executeWithParameters(sql, parameters);
    console.log(productItem);
  } catch {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }

  return productItem;
}

async function addProduct(productDetails) {
  let sql =
    "INSERT INTO products set product_name =?, unit_price=?, category = ?, description=?";
  let parameters = [
    productDetails.product_name,
    productDetails.unit_price,
    productDetails.category,
    productDetails.description,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch {
    throw new ServerError(ErrorType.FAILED_TO_ADD_PRODUCT);
  }
}

async function editProduct(productDetails) {
  let sql = `update
  products 
  set 
  product_name =?,
  unit_price = ?,
  category = (select id from categories where category_name=?),
  description = ?
  where
  id = ?`;
  let parameters = [
    productDetails.product_name,
    productDetails.unit_price,
    productDetails.category_name,
    productDetails.description,
    productDetails.product_id,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch {
    throw new ServerError(ErrorType.FAILED_TO_UPDATE_PRODUCT);
  }
}

module.exports = { getAllProducts, pullProductItem, addProduct,editProduct };
