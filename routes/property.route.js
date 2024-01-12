const express = require("express");
const router = express.Router();
const Property = require("../controllers/property.controller");
const authenticate = require('../middlewares/authenticate.middlewate')

router.get("/",authenticate, Property.getAllProperties);

router.post("/",authenticate, Property.postProperty);

router.put("/:id",authenticate, Property.putPropertyById);

router.delete("/:id",authenticate, Property.deletePropertyById);

module.exports = router;