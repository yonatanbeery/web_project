const jwt = require("jsonwebtoken");
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');

const authenticate = async (req, res, next) => {
    let errors = 0;
    const authHeaders = req.headers['authorization'];
    if(!authHeaders) return res.status(401).send();

    jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) errors++;
        if(user) {
            req.userId = user._id;
            console.log('request by ' + req.userId);
            next()
        }
    });

    if (errors == 1) {
        try{
            const client = new OAuth2Client();
            axios.get('https://oauth2.googleapis.com/tokeninfo', {params:{
                access_token:authHeaders
            }}).then((res) => {
                if(res.status == 200) {
                    req.userId = res.data.email
                    console.log('request by ' + req.userId);
                    next()
                }
                else errors++;
            });
        } catch {
            return res.status(403).send("Unauthorized");
        }
    }

    if (errors == 2) return res.status(403).send("Unauthorized");
    
}

module.exports = authenticate;