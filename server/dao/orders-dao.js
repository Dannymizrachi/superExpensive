let connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

//insert orders shipping details to shipping details table
async function insertShippingDetails(
  shippingCity,
  shippingStreet,
  ShippingDate,
  CreditCard,
  cartId,
  userId
) {
  let sql =
    "insert into shipping_details set shipping_city =? , shipping_street =? , shipping_date =? , credit_card =? , user_id=? , cart_id =? ";
  let parameters = [
    shippingCity,
    shippingStreet,
    ShippingDate,
    CreditCard,
    userId,
    cartId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
    let newCartId = updateOrder(userId, cartId);
    return newCartId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

//update order into orders table
async function updateOrder(userId, cartId) {
  let sql = `insert into orders set 
  status = 1,
  order_date =(select shipping_date from shipping_details where user_id = ? and cart_id = ?),
   user_id=(select user_id from shopping_cart where user_id = ? and isCheckedOut =0) ,
   cart_id=? ,
   shipping_details_id=(select id from shipping_details where user_id =? and cart_id = ?)
   `;
  let parameters = [userId, cartId, userId, cartId, userId, cartId];
  try {
    await connection.executeWithParameters(sql, parameters);
    let newCartId = await isCheckedOut(userId, cartId);
    return newCartId;
    // await createNewCart(userId);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

// update isCheckedOut column in shopping cart table
async function isCheckedOut(userId, cartId) {
  let sql =
    "update shopping_cart set isCheckedOut = '1' where user_id = ? and id=?";
  let parameters = [userId, cartId];
  try {
    await connection.executeWithParameters(sql, parameters);
    let newCartId = await createNewCart(userId);
    return newCartId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

//create a new cart for user
async function createNewCart(userId) {
  let date = new Date();
  let sql = "INSERT INTO shopping_cart (timestamp, user_id)  values(?, ?)";
  let parameters = [date, userId];
  try {
    await connection.executeWithParameters(sql, parameters);
    let newCartId = await getNewCartId(userId);
    return newCartId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

//return the users new cart id
async function getNewCartId(userId) {
  let sql =
    "select id from shopping_cart where user_id =? and isCheckedOut = 0";
  let parameters = [userId];
  try {
    let cartId = await connection.executeWithParameters(sql, parameters);
    console.log("new cart id: " + cartId[0].id);
    return cartId[0].id;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  insertShippingDetails,
};
