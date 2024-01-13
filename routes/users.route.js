const express = require("express");
const router = express.Router();
const Users = require("../controllers/users.controller");
const authenticate = require('../middlewares/authenticate.middlewate')

router.put("/:id",authenticate, Users.updateUserSettings);

router.get("/:id",authenticate, Users.getUserSettings);

module.exports = router;
