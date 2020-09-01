var cors = require("cors");
const cartItemsController = require("./controllers/cartItems-controller");
const ordersController = require("./controllers/orders-controller");
const express = require("express");
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const citiesController = require("./controllers/cities-controller");
const categoriesController = require("./controllers/categories-controller");
const errorHandler = require("./errors/error-handler");

const server = express();
const loginFilter = require("./middlewares/login-filter");
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.use(loginFilter());
server.use(express.json());

server.use("/cartItem", cartItemsController);
server.use("/shipping-details", ordersController);
server.use("/products", productsController);
server.use("/cities", citiesController);
server.use("/users", usersController);
server.use("/categories", categoriesController);

server.use(errorHandler);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));
