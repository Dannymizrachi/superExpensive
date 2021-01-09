const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function addUser(
  userName,
  password,
  email,
  city,
  street,
  firstName,
  lastName,
  userType
) {
  let sql =
    "INSERT INTO users (username, password, email, city, street, first_name, last_name, user_type)  values(?, ?, ?, ? , ?, ?, ?, ?)";
  let parameters = [
    userName,
    password,
    email,
    city,
    street,
    firstName,
    lastName,
    userType,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
  getUserId(userName, password);
}

async function getUserId(userName, password) {
  console.log(userName, password);
  let sql = "select id from users where username=? and password=?";
  let parameters = [userName, password];
  try {
    let userId = await connection.executeWithParameters(sql, parameters);

    createCart(userId[0].id);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function createCart(usersLoginResult) {
  let date = new Date();
  let sql = "INSERT INTO shopping_cart (timestamp, user_id)  values(?, ?)";
  let parameters = [date, usersLoginResult];
  try {
    await connection.executeWithParameters(sql, parameters);
    return;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function login(user) {
  console.log(user);
  try {
    let sql =
      "SELECT users.id as user_id, shopping_cart.id as cart_id ,users.user_type FROM users join shopping_cart where users.username =? and password =? and users.id = shopping_cart.user_id and isCheckedOut = 0";
    let parameters = [user.userName, user.password];
    let usersLoginResult;
    usersLoginResult = await connection.executeWithParameters(sql, parameters);

    if (usersLoginResult === null || usersLoginResult.length === 0) {
      throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
    }
    console.log(usersLoginResult);
    return usersLoginResult[0];
  } catch (error) {
    throw new ServerError(ErrorType.USER_DOES_NOT_EXIST);
  }
}
async function userNameAlreadyExists(userName) {
  let sql = "select id from users where username = ?";
  let parameters = [userName];
  try {
    let userNameResult = await connection.executeWithParameters(
      sql,
      parameters
    );
    return userNameResult;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  addUser,
  login,
  userNameAlreadyExists,
};
