const env = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PropertiesRouter = require("./routes/property.route");
const UsersRouter = require("./routes/users.route");
const AuthRouter = require("./routes/auth.route");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc"); 
const cors = require('cors')

const setSwagger = (app) => {
  if (process.env.NODE_ENV == "development") {
    const options = {
      definition: {
      openapi: "3.0.0",
      info: {
      title: "Web Dev 2022 REST API",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{url: "http://localhost:8080"}],
    },
    apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }
}

const initApp = () => {
  const promise = new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    mongoose.connect(process.env.DB_URL).then(() => {
      const app = express();
      app.use(cors());

      app.use(cors())
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use("/properties", PropertiesRouter);
      app.use("/user", UsersRouter);
      app.use("/auth", AuthRouter);
      setSwagger(app);
      resolve(app);
    });
  });
  return promise;
};

module.exports = initApp;