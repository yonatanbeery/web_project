const fs = require("fs");
const {resolve} = require('path');
const User = require("../models/users.model");

const updateUserSettings = async (req, res) => {
    console.log("updating user details");
    try{
        let updatedFields = {};
        const {username, email, password} = req.body;
        updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (password) updatedFields.password = await bcrypt.hash(password, 10);
        if (updatedFields) await User.findOneAndUpdate({_id: req.userId},{...updatedFields});
        if(!!req.files[0]) fs.rename(req.files[0].path, './photos/users/' + username  + '.png', () => console.log('Image saved'));
        return res.status(200).send();
    } catch (err){
        return res.status(500).json({ message: err.message });
    }
};

const getUserSettings = async (req, res) => {
    try{
        console.log("get user " + req.userId + " details");
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).send("user not found");
        return res.status(200).send({user});
    } catch (err){
        return res.status(500).json({ message: err.message });
    }
};

const getUserImage = async (req, res) => {
    try {
        console.log("get user " + req.userId + " image");
        const user = await User.findById(req.userId);
        if(!user) return res.status(400).send("user not found");
        return res.status(200).sendFile(resolve('./photos/users/' + user.username + '.png'));
    } catch (err){
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    updateUserSettings,
    getUserSettings,
    getUserImage
};
