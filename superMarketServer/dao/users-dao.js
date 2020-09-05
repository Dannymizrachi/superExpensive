let connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
let cacheModule = require("../dao/cache-module");

async function addUser(user) {
  let sql =
    "INSERT INTO users (username, password, email, city, street, first_name, last_name, user_type)  values(?, ?, ?, ? , ?, ?, ?, ?)";
  let parameters = [
    user.userName,
    user.password,
    user.email,
    user.city,
    user.street,
    user.firstName,
    user.lastName,
    user.userType,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  getUserId(user.userName, user.password);
}

async function getUserId(userName, password) {
  let sql = "select id from users where username=? and password=?";
  let parameters = [userName, password];
  try {
    let userId = await connection.executeWithParameters(sql, parameters);

    isCartExisting(userId[0].id);
  } catch {
    throw new ServerError(ErrorType.FAILED_TO_GET_USER_ID);
  }
}

async function isUserExistByName() {
  return false;
}

async function isCartExisting(usersLoginResult) {
  let sql = "SELECT id FROM shopping_cart WHERE user_id=?";
  parameters = [usersLoginResult];
  try {
    let userInDB = await connection.executeWithParameters(sql, parameters);

    if (userInDB.length > 0) {
      return;
    } else {
      await createCart(usersLoginResult);
    }
  } catch {
    response.status(600).send(error.message);
  }
}

async function createCart(usersLoginResult) {
  let date = new Date();
  let sql = "INSERT INTO shopping_cart (timestamp, user_id)  values(?, ?)";
  let parameters = [date, usersLoginResult];
  try {
    await connection.executeWithParameters(sql, parameters);
    return;
  } catch {
    throw new ServerError(ErrorType.FAILED_TO_CREATE_CART);
  }
}

async function login(user) {
  try {
    let sql =
      "SELECT users.id as user_id, shopping_cart.id as cart_id ,users.user_type FROM users join shopping_cart where users.username =? and password =? and users.id = shopping_cart.user_id";
    let parameters = [user.userName, user.password];
    let usersLoginResult;
    usersLoginResult = await connection.executeWithParameters(sql, parameters);

    if (usersLoginResult == null || usersLoginResult.length == 0) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    isCartExisting(usersLoginResult[0]);
    return usersLoginResult[0];
  } catch {
    throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
  }
}


async function getUserType(token) {
  let userType = cacheModule.get(token);
  console.log(userType.user_type)
  return userType.user_type;
}

module.exports = {
  addUser,
  isUserExistByName,
  login,
  getUserType,
};
