const express = require("express");
const router = express.Router();
const Property = require("../controllers/property.controller");
const authenticate = require('../middlewares/authenticate.middlewate')
const multer = require('multer');
let update = multer({ dest: 'photos/posts/' })

router.get("/",authenticate, Property.getAllProperties);

router.get("/photos/:id",authenticate, Property.getPropertyPhotos);

router.get("/:id",authenticate, Property.getPropertyById);

router.post("/", update.any(), authenticate, Property.postProperty);

router.put("/:id",authenticate, Property.putPropertyById);

router.delete("/:id",authenticate, Property.deletePropertyById);

router.post('/postComment',authenticate, Property.postPropertyComment);

module.exports = router;