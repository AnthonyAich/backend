// importeren van de express module
// initialiseren van de express applicatie
const express = require('express');
const app = express();

// importeren van de body-parser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// dotenv PORT data importeren
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
// cors
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3001', 'https://www.anthonyaichouche.be'],
    credentials: true,
}));

app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:3001', 'https://www.anthonyaichouche.be'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

//middleware
const authenticate = require('./middleware/authenticate');
app.use((req, res, next) => {
    // if res is login or logout
    if (req.path === '/login' || req.path === '/login/logout' || req.path === '/login/register') {
        next();
    } else {
        authenticate(req, res, next);
    }
});

//routes importeren
const routes = require('./routes');
app.use('/', routes);

// port 3000
app.listen(PORT, () => {
    console.log('🚀 Server running on port ' + PORT);
});