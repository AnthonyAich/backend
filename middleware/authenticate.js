const jwt = require('jsonwebtoken');
let authenticate = (req, res, next) => {
    if (!((req.headers.cookie))) {
        res.status(200).send("Unauthorized");
        console.log('no cookie');
    } else {
        const token = (req.headers.cookie).split('=')[1];
        // check if token is valid
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
            // if exists
            if (error) {
                if (error.message === 'jwt expired') {
                    res.status(200).send("Unauthorized");
                    console.log('Error in Auth: ', error.message);
                }
            } else {
                // console.log('payload', payload);
                req.student = payload;
                next();
            }
        });
    }
};


module.exports = authenticate;