const env = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PropertiesRouter = require("./routes/property.route");
const UsersRouter = require("./routes/users.route");
const AuthRouter = require("./routes/auth.route");
const cors = require('cors')

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
      resolve(app);
    });
  });
  return promise;
};

module.exports = initApp;
