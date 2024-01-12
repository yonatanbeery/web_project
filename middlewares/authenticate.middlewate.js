const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');

const authenticate = async (req, res, next) => {
    let errors = 0;
    const authHeaders = req.headers['authorization'];
    console.log(authHeaders);
    if(!authHeaders) return res.status(401).send();

    jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send("Unauthorized");
        if(user) {
            req.user = user;
            next()
        }
    });
/*
    console.log({errors});

    const client = new OAuth2Client();
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: authHeaders,
            audience: "673439569784-f3vannd084rml3iuen6peammjbrm172g.apps.googleusercontent.com",
        });
        console.log({ticket});
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log({userid});
        }
    verify().then(next()).catch(errors++);
    if(errors == 2) {
        console.log("retrurs");
        return res.status(403).send("Unauthorized");
    }*/
    
}

module.exports = authenticate;