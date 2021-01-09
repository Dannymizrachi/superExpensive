const usersDao = require("../dao/users-dao");
const cacheModule = require("../dao/cache-module");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const RIGHT_SALT = "ksdjfhbAWEDCAS29!@$addlkmn";
const LEFT_SALT = "32577098ASFKJkjsdhfk#$dc";

//add new user
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
  await usersDao.addUser(
    userName,
    password,
    email,
    city,
    street,
    firstName,
    lastName,
    userType
  );
}

//login
async function login(user) {
  let userData = await usersDao.login(user);
  let saltedUserName = LEFT_SALT + user.userName + RIGHT_SALT;
  const jwtToken = jwt.sign(
    { sub: saltedUserName, userType: userData.user_type },
    config.secret
  );
  cacheModule.set(jwtToken, userData);
  let successfullLoginResponse = {
    token: jwtToken,
    userType: userData.user_type,
  };
  return successfullLoginResponse;
}

module.exports = {
  addUser,
  login,
};
