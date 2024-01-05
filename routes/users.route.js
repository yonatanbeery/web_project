const express = require("express");
const router = express.Router();
const Users = require("../controllers/users.controller");

router.post("/login", Users.login);

router.post("/signup", Users.signup);

router.put("/:id", Users.updateUserSettings);

router.get("/:id", Users.getUserSettings);

module.exports = router;
