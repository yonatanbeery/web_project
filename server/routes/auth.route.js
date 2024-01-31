const express = require("express");
const router = express.Router();
const Users = require("../controllers/auth.controller");
const multer = require('multer');
let upload = multer({ dest: 'photos/users/' })

/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*   schemas:
*       User:
*           type: object
*           required:
*               - email
*               - password
*           properties:
*               email:
*                   type: string
*                   description: The user email
*               password:
*                   type: string
*                   description: The user password
*           example:
*               email: 'bob@gmail.com'
*               password: '123456'
*/
router.post("/login", Users.login);

router.post("/googleLogin", Users.googleLogin);

router.post("/signup", upload.any(), Users.signup);

router.post("/refreshToken", Users.refreshToken);

router.post("/logout", Users.logout);

module.exports = router;
