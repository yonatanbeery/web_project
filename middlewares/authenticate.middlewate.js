const jwt = require("jsonwebtoken");
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');

const authenticate = async (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if(!authHeaders) return res.status(401).send();

    jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send("Unauthorized");
        if(user) {
            req.userId = user._id;
            console.log('request by ' + req.userId);
            next()
        }
    });    
}

module.exports = authenticate;