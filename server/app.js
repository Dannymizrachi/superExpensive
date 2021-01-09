const fs = require("fs");
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const uuid = require("uuid");
const usersController = require("./controllers/users-controller");
const cartItemsController = require("./controllers/cartItems-controller");
const ordersController = require("./controllers/orders-controller");
const productsController = require("./controllers/products-controller");
const citiesController = require("./controllers/cities-controller");
const categoriesController = require("./controllers/categories-controller");
const errorHandler = require("./errors/error-handler");
const server = express();

server.use(fileUpload());
const loginFilter = require("./middlewares/login-filter");
const bodyParser = require("body-parser");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());

//validates an uploads file in the server
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

server.use(cors());
server.use(errorHandler);

//upload images handling - didn't know was best to put this since it is using the server express.
server.post("/file", async (request, response) => {
  try {
    const file = request.files.file;
    const extension = file.name.substr(file.name.lastIndexOf("."));
    let newUuidFileName = uuid.v4();
    let newFileName = newUuidFileName + extension;
    file.mv("./uploads/" + newFileName);
    let successfulUploadResponse = { name: newFileName };

    response.status(200).json(successfulUploadResponse);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

server.get("/uploads/:name", (request, response) => {
  let fileName = request.params.name;
  let fullQualifiedFileName = __dirname + "/uploads/" + fileName;

  response.sendFile(fullQualifiedFileName);
});

server.use(loginFilter());

server.use("/cartItem", cartItemsController);
server.use("/shipping-details", ordersController);
server.use("/products", productsController);
server.use("/cities", citiesController);
server.use("/users", usersController);
server.use("/categories", categoriesController);

server.listen(3000, () => console.log("Listening on http://localhost:3000"));
