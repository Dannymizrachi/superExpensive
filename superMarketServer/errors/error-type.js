let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false,
  },
  USER_DOES_NOT_EXIST: {
    id: 4,
    httpCode: 601,
    message: "User Does Not Exist",
    isShowStackTrace: false,
  },
  FAILED_TO_ADD_USER: {
    id: 5,
    httpCode: 602,
    message: "Failed to add user",
    isShowStackTrace: false,
  },
  FAILED_TO_GET_USER_ID: {
    id: 6,
    httpCode: 603,
    message: "Failed to get user id",
    isShowStackTrace: false,
  },
  FAILED_TO_CREATE_CART: {
    id: 7,
    httpCode: 604,
    message: "Failed to create cart",
    isShowStackTrace: false,
  },
  FAILED_TO_INSERT_SHIPPING_DETAILS: {
    id: 8,
    httpCode: 605,
    message: "Failed to insert shipping details",
    isShowStackTrace: false,
  },
  FAILED_TO_UPDATE_ORDER: {
    id: 9,
    httpCode: 606,
    message: "Failed to update order",
    isShowStackTrace: false,
  },
};

module.exports = ErrorType;
