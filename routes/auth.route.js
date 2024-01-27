const express = require("express");
const router = express.Router();
const Users = require("../controllers/auth.controller");
const multer = require('multer');
let upload = multer({ dest: 'photos/users/' })

router.post("/login", Users.login);

router.post("/googleLogin", Users.googleLogin);

router.post("/signup", upload.any(), Users.signup);

router.post("/refreshToken", Users.refreshToken);

router.post("/logout", Users.logout);

module.exports = router;
