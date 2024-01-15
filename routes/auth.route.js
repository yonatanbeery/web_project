const express = require("express");
const router = express.Router();
const Users = require("../controllers/auth.controller");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'photos/users')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
let upload = multer({ dest: 'photos/users/' })

router.post("/login", Users.login);

router.post("/signup", upload.any(), Users.signup);

router.post("/refreshToken", Users.refreshToken);

router.post("/logout", Users.logout);

module.exports = router;
