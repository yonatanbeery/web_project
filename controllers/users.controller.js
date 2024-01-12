const fs = require("fs");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    console.log("login request");
    try {
        const {username, password} = req.body.data;
        const user = await User.findOne({username});
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(
                {'_id': user.id},
                process.env.ACCESS_TOKEN_SECRET
            );
            user ? res.status(200).send({"accessToken": accessToken}) : res.status(403).send()
        } else throw new Error("unauthorized");
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const signup = async (req, res) => {
    console.log("signup");
    try {
        const {userImage ,username, email, password} = req.body.data;
        if (!(username && email && password)) {
            throw new Error("invalid user details");
        } else {
            if (await User.findOne({username})) {
                throw new Error("User already exists");
            } else {
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = await bcrypt.hash(password, salt);
                const user = await User.insertMany({username, email, password: encryptedPassword});
                fs.writeFile('./photos/users/' + username + '.jpeg', userImage, (error) => {
                    if (error) {
                     throw error;
                   }
                    console.log("Image saved.");
                   });
                user ? res.status(200).send({"accessToken": "token"}) : res.status(403).send()
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = async (req, res) => {
    console.log("logout request");
    try {
        res.status(200).send();
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const updateUserSettings = (req, res) => {
    
};

const getUserSettings = (req, res) => {
    
};

module.exports = {
    login,
    signup,
    updateUserSettings,
    getUserSettings
};
