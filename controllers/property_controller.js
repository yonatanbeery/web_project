const Property = require("../models/property_model");

const getAllProperties = async (req, res) => {
    console.log("getAllProperties");
    try {
        let property = req.query ? await Property.find(req.query) : await Property.find();
        res.send(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postProperty = async (req, res) => {
        console.log("postProperty:" + req.body);
    const property = new Property(req.body);
    try {
        await property.save();
        res.status(201).send("OK");
    } catch (err) {
        console.log(err);
        res.status(406).send("fail: " + err.message);
    }
};

const putPropertyById = (req, res) => {
    res.send("put property by id: " + req.params.id);
};

const deletePropertyById = (req, res) => {
    res.send("delete property by id: " + req.params.id);
};

module.exports = {
    getAllProperties,
    postProperty,
    putPropertyById,
    deletePropertyById
};
