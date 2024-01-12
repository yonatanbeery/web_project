const express = require("express");
const router = express.Router();
const Users = require("../controllers/users.controller");
const authenticate = require('../middlewares/authenticate.middlewate')

router.post("/login", Users.login);

router.post("/signup", Users.signup);

router.put("/:id",authenticate, Users.updateUserSettings);

router.get("/:id",authenticate, Users.getUserSettings);

module.exports = router;
