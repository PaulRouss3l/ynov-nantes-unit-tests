const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./docs/swagger.js");

const PORT = process.env.PORT || 5000;

const app = require("./app.js");

const mongoose = require("mongoose");
const DB_URI = "mongodb://mongo:27017/toDoApp";

mongoose.connect(DB_URI).then(() => {
  console.log("Listening on port: " + PORT);
  app.listen(PORT);
});
