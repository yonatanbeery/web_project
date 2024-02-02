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
*               - username
*               - email
*               - password
*           properties:
*               username:
*                   type: string
*                   descrioption: The user's display name
*               email:
*                   type: string
*                   description: The user's email
*               password:
*                   type: string
*                   description: The user's password
*               userImage:
*                   type: file
*                   descrioption: The user's profile picture
*           example:
*               username: 'bob123'
*               email: 'bob@gmail.com'
*               password: '123456'
*               userImage: 'bob123.png'
*       UserLogin:
*           type: object
*           required:
*               - username
*               - password
*           properties:
*               data:
*                   type: object
*                   properties:
*                       username:
*                           type: string
*                           descrioption: The user's display name
*                       password:
*                           type: string
*                           description: The user's password
*           example:
*               data:
*                   username: 'bob123'
*                   password: '123456'
*       Tokens:
*           type: object
*           required:
*               - accessToken
*               - refreshToken
*               - userId
*           properties:
*               accessToken:
*                   type: string
*                   description: The JWT access token
*               refreshToken:
*                   type: string
*                   description: The JWT refresh token
*               userId:
*                   type: string
*                   description: User ID
*           example:
*               accessToken: '123cd123x1xx1'
*               refreshToken: '134r2134cr1x3c'
*/

/**
* @swagger
* /auth/login:
*   post:
*       summary: user login
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/UserLogin'
*       responses:
*           200:
*               description: The access & refresh tokens
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.post("/login", Users.login);

router.post("/googleLogin", Users.googleLogin);

/**
* @swagger
* /auth/signup:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user's authentication token
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.post("/signup", upload.any(), Users.signup);

/**
* @swagger
* /auth/refreshToken:
*   post:
*       summary: get a new access token using the refresh token
*       tags: [Auth]
*       description: need to provide the refresh token in the auth header
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The acess & refresh tokens
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Tokens'
*/
router.post("/refreshToken", Users.refreshToken);

/**
* @swagger
* /auth/logout:
*   post:
*       summary: logout a user
*       tags: [Auth]
*       description: need to provide the refresh token in the auth header
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: logout completed successfully
*/

router.post("/logout", Users.logout);

module.exports = router;
