let connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const { request } = require("express");
const cacheModule = require("./cache-module");

async function addItemToCart(product_id, amount, cart_id) {
  let sql =
    "INSERT INTO cart_items SET cart_id = ?, product_id = ?, amount = ?, total_price =  amount * (SELECT unit_price FROM products WHERE id = ?)";
  let parameters = [cart_id, product_id, amount, product_id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function deleteItemFromCart(product_id, amount, cart_id) {
  let sql =
    "UPDATE cart_items SET amount= amount-? ,total_price = amount * (SELECT unit_price FROM products WHERE id = ?) , product_id=?, cart_id=? WHERE cart_id=? and product_id=?";
  let parameters = [
    amount,
    product_id,
    product_id,
    cart_id,
    cart_id,
    product_id,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
    await checkAmountFieldToDelete(product_id, cart_id);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function checkAmountFieldToDelete(product_id, cart_id) {
  let sql = "select amount from cart_items where product_id=? and cart_id=?";
  let parameters = [product_id, cart_id];
  try {
    let fieldCheck = await connection.executeWithParameters(sql, parameters);
    console.log(fieldCheck);
    if (fieldCheck[0].amount === 0) {
      await deleteFieldFromDB(product_id, cart_id);
    } else {
      return;
    }
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function deleteFieldFromDB(product_id, cart_id) {
  let sql =
    "delete from cart_items where amount = 0 and product_id=? and cart_id=?";
  let parameters = [product_id, cart_id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function checkAmountFieldToAdd(product_id, amount, cart_id, userId) {
  console.log(product_id, amount, cart_id);
  let sql =
    "SELECT amount FROM shufersal.cart_items where product_id = ? and cart_id=?";
  let parameters = [product_id, cart_id];
  try {
    let amountExists = await connection.executeWithParameters(sql, parameters);

    if (amountExists.length == 0) {
      await addItemToCart(product_id, amount, cart_id);
    } else {
      await updateAmount(product_id, cart_id);
    }
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function updateAmount(product_id, cart_id) {
  let sql =
    "update cart_items set amount =(amount+ 1), total_price =  amount * (SELECT unit_price FROM products WHERE id = ?) where product_id = ? and cart_id = ?";
  let parameters = [product_id, product_id, cart_id];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function updateShoppingCartTotalPrice(cart_id, userId) {
  console.log(userId);
  let sql =
    "UPDATE shopping_cart set totalPrice = (SELECT sum(total_price) FROM cart_items WHERE cart_id =?) WHERE user_id =?";
  let parameters = [cart_id, userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function getAllCartItems(cartId) {
  let sql = `select
	product_name,
    amount,
    total_price,
     unit_price,
     product_id as id
from
	products
join
	cart_items
    where
    cart_items.product_id = products.id
    and cart_id=?`;
  let parameters = [cartId];

  let usersCartItems = await connection.executeWithParameters(sql, parameters);

  return usersCartItems;
}

module.exports = {
  addItemToCart,
  updateShoppingCartTotalPrice,
  checkAmountFieldToAdd,
  updateAmount,
  deleteItemFromCart,
  getAllCartItems,
};

// get cart_items in login.