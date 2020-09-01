let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

router.post("/register", async (request, response, next) => {
  let user = request.body;

  try {
    await usersLogic.addUser(user);
    response.json();
  } catch (error) {
    return next(error);
    // console.log("Failed to add user");
    // console.error(err);
    // response.status(600).send(error.message);
  }
});

router.post("/login", async (request, response, next) => {
  let user = request.body;

  try {
    let successfullLoginData = await usersLogic.login(user);
    response.json(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
