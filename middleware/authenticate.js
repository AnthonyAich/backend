const jwt = require('jsonwebtoken');
const auth = true;
let authenticate = (req, res, next) => {
    if (auth) {
        if (!(req.cookies.token && req.cookies["token"])) { res.status(401).send("Unauthorized"); return; }
        const token = req.cookies["token"];
        // check if token is valid
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
            if (error) { res.status(401).send("Unauthorized"); return; }
            req.user = payload;
        });
        next();
    } else {
        next();
    }
};


module.exports = authenticate;