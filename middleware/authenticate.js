const jwt = require('jsonwebtoken');
const auth = false;
let authenticate = (req, res, next) => {
    if (auth) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(505);
            req.user = user;
            next();
        });
    } else {
        next();
    }
};


module.exports = authenticate;