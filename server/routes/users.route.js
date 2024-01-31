const express = require("express");
const router = express.Router();
const Users = require("../controllers/users.controller");
const authenticate = require('../middlewares/authenticate.middlewate')
const multer = require('multer');
let update = multer({ dest: 'photos/users/' })

router.put("/updateProfile", update.any(),authenticate, Users.updateUserSettings);

router.post("/getUserSettings",authenticate, Users.getUserSettings);

router.post("/getUserImage",authenticate, Users.getUserImage);

module.exports = router;
