const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    console.log(req.headers);
    const authHeaders = req.headers['authorization'];
    if(!authHeaders) return res.status(401).send();
    jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send(err.message);
        req.user = user;
        next()
    })
}

module.exports = authenticate;