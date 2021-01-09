const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

//register
router.post("/register", async (request, response, next) => {
  let user = request.body;
  let userName = user.userName;
  let password = user.password;
  let email = user.email;
  let city = user.city;
  let street = user.street;
  let firstName = user.firstName;
  let lastName = user.lastName;
  let userType = "CUSTOMER";
  console.log(user);
  try {
    await usersLogic.addUser(
      userName,
      password,
      email,
      city,
      street,
      firstName,
      lastName,
      userType
    );
    response.json();
  } catch (error) {
    return next(error);
  }
});
//login
router.post("/login", async (request, response, next) => {
  let user = request.body;
  console.log(user)
  try {
    let successfullLoginData = await usersLogic.login(user);
    response.json(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
