const express = require("express");
const router = express.Router();
const Property = require("../controllers/property.controller");

router.get("/", Property.getAllProperties);

router.post("/", Property.postProperty);

router.put("/:id", Property.putPropertyById);

router.delete("/:id", Property.deletePropertyById);

module.exports = router;