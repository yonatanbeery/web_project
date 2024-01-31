const fs = require("fs");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const path = require('path');

const login = async (req, res) => {
    console.log("login request");
    try {
        const {username, password} = req.body.data;
        const user = await User.findOne({username});
        if (await bcrypt.compare(password, user.password)) {
            const {accessToken, refreshToken} = generateTokens(user._id);
            if (!user.tokens) user.tokens = [refreshToken];
            else user.tokens.push(refreshToken);
            await user.save();
            user ? res.status(200).send({"accessToken": accessToken, "refreshToken": refreshToken, "userId": user._id}) : res.status(403).send()
        } else throw new Error("unauthorized");
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const googleLogin = async (req, res) => {
    const googleToken = req.body.data.access_token;
    try{
        const validationRespone = await axios.get('https://oauth2.googleapis.com/tokeninfo', {params:{
            access_token:googleToken
        }})
        if(validationRespone.status == 200) {
            const userName = validationRespone.data.email;
            let registeredUser = await User.findOne({username:userName});
            if(!registeredUser) {
                registeredUser = (await User.insertMany({username: userName, email: userName, password: "####"}))[0];
                console.log(registeredUser)
                fs.cp(path.resolve('./photos/defaultUserImage.png'), './photos/users/' + userName  + '.png', () => console.log('Default Image saved'));
            }
            const {accessToken, refreshToken} = generateTokens(registeredUser._id);
            if (!registeredUser.tokens) registeredUser.tokens = [refreshToken];
            else registeredUser.tokens.push(refreshToken);
            await registeredUser.save();
            return res.status(200).send({"accessToken": accessToken, "refreshToken": refreshToken, "userId": registeredUser._id});
        }
    } catch (e) {
        console.log(e)
        return res.status(403).send("Unauthorized");
    }
}

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
            const {accessToken, refreshToken} = generateTokens(user._id);
            
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
        const {username, email, password} = req.body;
        if (!(username && email && password)) {
            console.log("invalid user details");
            throw new Error("invalid user details");
        } else {
            if (await User.findOne({username})) {
                console.log("User already exists");
                throw new Error("User already exists");
            } else {
                const encryptedPassword = await bcrypt.hash(password, 10);
                const user = await User.insertMany({username, email, password: encryptedPassword});
                if(req.files) fs.rename(req.files[0].path, './photos/users/' + username  + '.png', () => console.log('Image saved'));
                else fs.cp(path.resolve('./photos/defaultUserImage.png'), './photos/users/' + username  + '.png', () => console.log('Default Image saved'));
                const {accessToken, refreshToken} = generateTokens(user._id);
                return res.status(200).send({"accessToken": accessToken, "refreshToken": refreshToken});
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const logout = async (req, res) => {
    console.log("logout request");
    const refreshToken = req.headers['authorization'];
    if(!refreshToken) return res.status(401).send();

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).json({ message: err.message });
        try {
            const user = await User.findById(userInfo._id);
            if (!user) return res.status(403).send("Invalid request");
            if (!user.tokens.includes(refreshToken)) {
                user.tokens = [];
                await user.save();
                return res.status(403).send("Invalid request");
            }
            
            user.tokens.splice(user.tokens.indexOf(refreshToken), 1);
            await user.save();
            res.status(200).send();
        } catch (err) {
            res.status(403).json({ message: err.message });
        }
    });
};

const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        {'_id': userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"}
    );
    const refreshToken = jwt.sign(
        {'_id': userId},
        process.env.REFRESH_TOKEN_SECRET
    );
    return {accessToken, refreshToken};
}

module.exports = {
    login,
    googleLogin,
    signup,
    refreshToken,
    logout
};
