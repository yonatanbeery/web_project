const fs = require("fs");

const login = async (req, res) => {
    console.log("login request");
    try {
        console.log(req.body.data.username);
        console.log(req.body.data.password);
        //todo if has in mongo.. else 403
        res.send(200);
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

const signup = async (req, res) => {
    console.log("signup");
    try {
        console.log(req.body.data);
        fs.writeFile(req.body.data.username + '.jpeg', req.body.data.picture, (error) => {
            if (error) {
             throw error;
           }
            console.log("Image saved.");
           });
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
