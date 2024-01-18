const express = require("express");
const router = express.Router();
const Property = require("../controllers/property.controller");
const authenticate = require('../middlewares/authenticate.middlewate')

router.get("/",authenticate, Property.getAllProperties);

router.get("/:id", Property.getPropertyById);

router.post("/",authenticate, Property.postProperty);


router.put("/:id",authenticate, Property.putPropertyById);

router.delete("/:id",authenticate, Property.deletePropertyById);

router.post('/postComment', Property.postPropertyComment);

module.exports = router;