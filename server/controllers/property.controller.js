const Property = require("../models/property.model");
const path = require('path');
const fs = require('fs').promises;

const getPropertyPhotos = async (id) => {
    console.log("get properties images");

    try {
        const photosPath = path.resolve('./photos/posts/' + id);
        const photoFiles = await fs.readdir(photosPath);


        const photoDataArray = await Promise.all(photoFiles.map(async fileName => {
            const filePath = path.join(photosPath, fileName);
            const fileData = await fs.readFile(filePath);
            return { fileName, fileData };
        }));

        return photoDataArray 
    } catch (error) {
        return [] 
    }
}

const getAllProperties = async (req, res) => {
    console.log("getAllProperties");
    
    const query = {
        ...(req.query.creator && { creator: { $eq: req.query.creator } }),
        ...(req.query.location && { location: req.query.location }),
        ...(req.query.dealType && { dealType: req.query.dealType }),
        ...(req.query.homeType && { homeType: req.query.homeType }),
        ...(req.query.bedrooms && { bedrooms: { $gte: req.query.bedrooms } }),
        ...(req.query.bathrooms && { bathrooms: { $gte: req.query.bathrooms } }),
    };
    
    if (req.query.price) {
        const priceQuery = {};
        if (req.query.price.minPrice && req.query.price.maxPrice) {
            priceQuery.price = {
                $gte: req.query.price.minPrice,
                $lte: req.query.price.maxPrice
            };
        } else if (req.query.price.minPrice) priceQuery.price = { $gte: req.query.price.minPrice }
        else if (req.query.price.maxPrice) priceQuery.price = { $lte: req.query.price.maxPrice };
        Object.assign(query, priceQuery);
    }

    try {
        let properties = req.query ? await Property.find(query) : await Property.find();
        
        const newProperties = await Promise.all(properties.map(async (property) => {
            const photos = await getPropertyPhotos(property.id);
            return { ...property.toObject(), photos };
        }));

        res.send(newProperties);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
};

const postProperty = async (req, res) => {
        console.log("postProperty:" + {...req.body.post});
        const property = new Property({...JSON.parse(req.body.post)});
    try {
        const post = await property.save();
        if(!!req.files) {
            req.files.forEach(async photo => {
                const directoryPath = `./photos/posts/${post._id}`;

                try {
                    await fs.mkdir(directoryPath, { recursive: true });
                } catch (err) {
                    console.error(`Error creating directory: ${err}`);
                }
                
                const { path: filePath, originalname } = photo;

                try {
                    const fileContent = await fs.readFile(filePath);
                    await fs.writeFile(`${directoryPath}/${originalname}`, fileContent);
                
                    console.log('File has been written successfully!');
                } catch (error) {
                        console.error('Error writing file:', error);
                    }
                });
            };
            res.status(201).send("OK");
    } catch (err) {
        console.log(err);
        res.status(406).send("fail: " + err.message);
    }
};


const updateProperty = async (req, res) => {
    console.log("updateProperty:");
    const updatedPost = JSON.parse(req.body.post);
    console.log({...JSON.parse(req.body.post)});
try {
    const property = await Property.findOne({_id:req.params.id});
    property.dealType = updatedPost.dealType;
    property.location = updatedPost.location;
    property.price = updatedPost.price;
    property.bedrooms = updatedPost.bedrooms;
    property.bathrooms = updatedPost.bathrooms;
    property.area = updatedPost.area;
    property.homeType = updatedPost.homeType;
    property.contactDetails = updatedPost.contactDetails;
    property.freeText = updatedPost.freeText;
    property.comments = updatedPost.comments;
    property.creator = updatedPost.creator;
    property.save()
    if(req.files?.length > 0) {
        const directoryPath = `./photos/posts/${req.params.id}`;
        try {
            await fs.rm(directoryPath, { recursive: true });
        } catch (err) {
            console.error(`Error removing old directory: ${err}`);
        }

        try {
            await fs.mkdir(directoryPath, { recursive: true });
            req.files.forEach(async photo => {
                const directoryPath = `./photos/posts/${req.params.id}`;
                
                const { path: filePath, originalname } = photo;
                try {
                    const fileContent = await fs.readFile(filePath);
                    await fs.writeFile(`${directoryPath}/${originalname}`, fileContent);
                
                    console.log('File has been written successfully!');
                } catch (error) {
                        console.error('Error writing file:', error);
                    }
                });
        } catch (err) {
            console.error(`Error creating directory: ${err}`);
        }
        };
        res.status(201).send("OK");
} catch (err) {
    console.log(err);
    res.status(406).send("fail: " + err.message);
}
};

const deletePropertyById = async (req, res) => {
    console.log("deleting property " + req.params.id);
    await Property.deleteOne({_id: req.params.id});
    res.send("delete property by id: " + req.params.id);
};

const postPropertyComment = async (req, res) => {
    
    const { id } = req.body;

    try {
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).send("Property not found");
        }

        const { comment } = req.body; 

        if (!comment || comment.trim() === "") {
            return res.status(400).send("Comment cannot be empty");
        }

        property.comments.push(comment);
        await property.save();

        res.status(200).send("Comment added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add comment");
    }
}

const getPropertyById = async (req, res) => {
    const property = await Property.findById(req.params.id);
    res.send(property);
}

module.exports = {
    getAllProperties,
    postProperty,
    updateProperty,
    deletePropertyById,
    postPropertyComment,
    getPropertyById,
    getPropertyPhotos,
};
