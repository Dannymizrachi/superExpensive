let connection = require("./connection-wrapper");

async function getAllProducts() {
  let sql = `SELECT 
    products.id,
    product_name,
    unit_price,
    categories.category_name,
    description 
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
module.exports = { getAllProducts, pullProductItem, addProduct };
