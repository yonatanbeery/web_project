const express = require("express");
const router = express.Router();
const Users = require("../controllers/auth.controller");

router.post("/login", Users.login);

router.post("/signup", Users.signup);

router.post("/refreshToken", Users.refreshToken);

router.post("/logout", Users.logout);

module.exports = router;
