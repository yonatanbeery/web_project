const fs = require("fs");
const User = require("../models/users.model");

const login = async (req, res) => {
    console.log("login request");
    try {
        const {username, password} = req.body.data;
        const user = await User.findOne(username, password);
        console.log(user);
        user ? res.status(200).send() : res.status(403).send()
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const signup = async (req, res) => {
    console.log("signup");
    try {
        const {userImage ,username, email, password} = req.body.data;
        const user = await User.insertMany({username, email, password});
        console.log(user);
        console.log(userImage);
        fs.writeFile('./photos/users/' + username + '.jpeg', userImage, (error) => {
            if (error) {
             throw error;
           }
            console.log("Image saved.");
           });
        user ? res.status(200).send() : res.status(403).send()
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const updateUserSettings = (req, res) => {
    
};

const getUserSettings = (req, res) => {
    
};

const verifyUser = (req, res) => {
    console.log(req.headers.authorization);
    return !!req.headers.authorization;
};

module.exports = {
    login,
    signup,
    updateUserSettings,
    getUserSettings,
    verifyUser
};
