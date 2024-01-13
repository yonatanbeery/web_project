const fs = require("fs");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    console.log("login request");
    try {
        const {username, password} = req.body.data;
        const user = await User.findOne({username});
        if (await bcrypt.compare(password, user.password)) {
            const {accessToken, refreshToken} = generateTokens(user);
            if (!user.tokens) user.tokens = [refreshToken];
        
            else user.tokens.push(refreshToken);
            await user.save();
            user ? res.status(200).send({"accessToken": accessToken, "refreshToken": refreshToken}) : res.status(403).send()
        } else throw new Error("unauthorized");
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const refreshToken = async (req, res) => {
    console.log("new access token request");
    const oldRrefreshToken = req.headers['authorization'];
    if(!oldRrefreshToken) return res.status(401).send();

    jwt.verify(oldRrefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json({ message: err.message });
        try {
            const user = await User.findById(userInfo._id);
            if (!user) return res.status(403).send("Invalid request");
            if (!user.tokens.includes(oldRrefreshToken)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send("Invalid request");
            }
            const {accessToken, refreshToken} = generateTokens(user);
            
            user.tokens[user.tokens.indexOf(oldRrefreshToken)] = refreshToken;
            await user.save();
            res.status(200).send({"accessToken": accessToken, "refreshToken": refreshToken});
        } catch (err) {
            res.status(403).json({ message: err.message });
        }
    });
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
                const encryptedPassword = await bcrypt.hash(password, 10);
                const user = await User.insertMany({username, email, password: encryptedPassword});
                fs.writeFile('./photos/users/' + username + '.jpeg', userImage, (error) => {
                    if (error) {
                     throw error;
                   }
                    console.log("Image saved.");
                   });
                const accessToken = jwt.sign(
                    {'_id': user._id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: "1h"}
                );
                user ? res.status(200).send({"accessToken": accessToken}) : res.status(403).send()
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = async (req, res) => {
    console.log("logout request");
    const rrefreshToken = req.headers['authorization'];
    if(!rrefreshToken) return res.status(401).send();

    jwt.verify(rrefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json({ message: err.message });
        try {
            const user = await User.findById(userInfo._id);
            if (!user) return res.status(403).send("Invalid request");
            if (!user.tokens.includes(rrefreshToken)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send("Invalid request");
            }
            const {accessToken, refreshToken} = generateTokens(user);
            
            user.tokens.splice(user.tokens.indexOf(rrefreshToken), 1);
            await user.save();
            res.status(200).send();
        } catch (err) {
            res.status(403).json({ message: err.message });
        }
    });
};

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {'_id': user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"}
    );
    const refreshToken = jwt.sign(
        {'_id': user._id},
        process.env.REFRESH_TOKEN_SECRET
    );
    return {accessToken, refreshToken};
}

module.exports = {
    login,
    signup,
    refreshToken,
    logout
};
