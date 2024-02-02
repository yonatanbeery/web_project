const express = require("express");
const router = express.Router();
const Property = require("../controllers/property.controller");
const authenticate = require('../middlewares/authenticate.middlewate')
const multer = require('multer');
let update = multer({ dest: 'photos/posts/' })

/**
* @swagger
* tags:
*   name: Properties
*   description: The properties posts API
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*   schemas:
*       Property:
*           type: object
*           properties:
*               _id:
*                   type: string
*               dealType:
*                   type: string
*               location:
*                   type: string
*               price:
*                   type: string
*               bedrooms:
*                   type: string
*               bathrooms:
*                   type: string
*               homeType:
*                   type: string
*               contactDetails:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                       phoneNumber:
*                           type: string
*                       EmailAddress:
*                           type: string
*               freeText:
*                   type: string
*               comments:
*                   type: string[]
*                   descrioption: comments
*               creator:
*                   type: string
*                   descrioption: Post creator
*               photos:
*                   type: file[]
*           example:
*               _id: "65bcf3ae40a6630217ba1484"
*               dealType: "rent"
*               location: "ABU AMRE"
*               price: 1111
*               bedrooms: 2
*               bathrooms: 3
*               area: 234
*               homeType: "house"
*               contactDetails:
*                   name: "john"
*                   phoneNumber: "213"
*                   EmailAddress: "333221"
*               freeText: "nicee"
*               comments: ["colool"]
*               creator: "65bce843372a5f1c06bca01f"
*               photos: []
*/

/**
* @swagger
* /properties/:
*   get:
*       summary: get all properties
*       tags: [Properties]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: All properties
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Property'
*/
router.get("/",authenticate, Property.getAllProperties);

/**
* @swagger
* /properties/photos/$id:
*   get:
*       summary: Property photos
*       tags: [Properties]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: The property photos
*               content:
*                   application/json:
*                       schema:
*                            properties:
*                                photos:
*                                    type: file[]
*                            example:
*                                photos: ['bob.png', 'bob2.png']
*/
router.get("/photos/:id",authenticate, Property.getPropertyPhotos);

/**
* @swagger
* /properties/$id:
*   get:
*       summary: get specific property
*       tags: [Properties]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Property'
*/
router.get("/:id",authenticate, Property.getPropertyById);

/**
* @swagger
* /properties/:
*   post:
*       summary: post property
*       tags: [Properties]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Property'
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: created post successfully
*/
router.post("/", update.any(), authenticate, Property.postProperty);

/**
* @swagger
* /properties/$id:
*   put:
*       summary: update property
*       tags: [Properties]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Property'
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: updated post successfully
*/
router.put("/:id",authenticate, Property.updateProperty);

/**
* @swagger
* /properties/$id:
*   delete:
*       summary: delete property
*       tags: [Properties]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: deleted post successfully
*/
router.delete("/:id",authenticate, Property.deletePropertyById);

/**
* @swagger
* /properties/$id:
*   post:
*       summary: add comment
*       tags: [Properties]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       properties:
*                           id:
*                               type: string
*                               descrioption: the post id
*                           comment:
*                               type: string
*                       example:
*                           id: '12as34ds'
*                           comment: 'bloop nice!'
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: added comment successfully
*/
router.post('/postComment',authenticate, Property.postPropertyComment);

module.exports = router;