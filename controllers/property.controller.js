const Property = require("../models/property.model");

const getAllProperties = async (req, res) => {
    console.log("getAllProperties");
    
    const query = {
        ...(req.query.price?.maxPrice && { price: { $lte: req.query.price.maxPrice } }),
        ...(req.query.price?.minPrice && { price: { $gte: req.query.price.minPrice } }),
        ...(req.query.location && { location: req.query.location }),
        ...(req.query.dealType && { dealType: req.query.dealType }),
        ...(req.query.homeType && { homeType: req.query.homeType }),
        ...(req.query.minBedrooms && { bedrooms: { $gte: req.query.minBedrooms } }),
        ...(req.query.minBathrooms && { bathrooms: { $gte: req.query.minBathrooms } }),
    };

    try {
        let properties = req.query ? await Property.find(query) : await Property.find();
        res.send(properties);
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
