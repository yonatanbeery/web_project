const fs = require("fs");
const User = require("../models/users.model");

const updateUserSettings = (req, res) => {
    
};

const getUserSettings = async (req, res) => {
    console.log("get user " + req.userId + " details");
    const user = await User.findById(req.userId);
    if(!user) return res.status(400).send("user not found");
    return res.status(200).send({user});
};

const getUserImage = async (req, res) => {
    console.log("get user " + req.userId + " image");
    const user = await User.findById(req.userId);
    if(!user) return res.status(400).send("user not found");
    return res.status(200).sendFile('./photos/users/' + user.username + '.jpeg')
};

module.exports = {
    updateUserSettings,
    getUserSettings,
    getUserImage
};
