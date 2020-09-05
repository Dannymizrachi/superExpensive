let connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function insertShippingDetails(
  shippingCity,
  shippingStreet,
  ShippingDate,
  CreditCard,
  userId
) {
  let sql =
    "insert into shipping_details set shipping_city =? , shipping_street =? , shipping_date =? , credit_card =? , user_id=? ";
  let parameters = [
    shippingCity,
    shippingStreet,
    ShippingDate,
    CreditCard,
    userId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (err) {
    throw new ServerError(ErrorType.FAILED_TO_INSERT_SHIPPING_DETAILS, err);
  }
  await updateOrder(userId);
}

async function updateOrder(userId) {
  let sql = `insert into orders set 
  order_date =(select shipping_date from shipping_details where user_id = ?),
   user_id=(select user_id from shopping_cart where user_id = ?) ,
   cart_id=(select id from shopping_cart where user_id = ?) ,
   shipping_details_id=(select id from shipping_details where user_id = ?)`;
  let parameters = [userId, userId, userId, userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch {
    throw new ServerError(ErrorType.FAILED_TO_UPDATE_ORDER);
  }
}

async function getOrderInfo(cartID){
  let sql = `SELECT 
	amount,
    total_price as itemTotalPrice,
    totalPrice as cartTotalPrice,
    product_name
    
 FROM 
	shufersal.cart_items
JOIN shufersal.shopping_cart
JOIN shufersal.products   

where shopping_cart.id = ? and products.id = cart_items.product_id`

let parameters = [cartID]
try {
  let orderDetails = await connection.executeWithParameters(sql, parameters);
  return orderDetails;
} catch {
  throw new ServerError(ErrorType.FAILED_TO_UPDATE_ORDER);
}

}


module.exports = {
  insertShippingDetails,
  getOrderInfo,
};
