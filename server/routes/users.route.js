const express = require("express");
const router = express.Router();
const Users = require("../controllers/users.controller");
const authenticate = require('../middlewares/authenticate.middlewate')
const multer = require('multer');
let update = multer({ dest: 'photos/users/' })


/**
* @swagger
* tags:
*   name: User settings
*   description: The user settings API
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*   schemas:
*       User:
*           type: object
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
*/

/**
* @swagger
* /user/updateProfile:
*   put:
*       summary: 
*       tags: [User settings]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: user settings updated successfully
*/
router.put("/updateProfile", update.any(),authenticate, Users.updateUserSettings);

/**
* @swagger
* /user/getUserSettings:
*   get:
*       summary: 
*       tags: [User settings]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The user's details
*               content:
*                   application/json:
*                       schema:
*                            properties:
*                                username:
*                                    type: string
*                                    descrioption: The user's display name
*                                email:
*                                    type: string
*                                    description: The user's email
*                            example:
*                                username: 'bob123'
*                                email: 'bob@gmail.com'
*/
router.get("/getUserSettings",authenticate, Users.getUserSettings);

/**
* @swagger
* /user/getUserImage:
*   get:
*       summary: 
*       tags: [User settings]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The user's image
*               content:
*                   application/json:
*                       schema:
*                            properties:
*                                userImage:
*                                    type: file
*                                    description: The user's image
*                            example:
*                                userImage: 'bob.png'
*/
router.get("/getUserImage",authenticate, Users.getUserImage);

module.exports = router;
