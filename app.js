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
// const PORT = process.env.PORT;
const config = require('./config');
const port = config.get('port');
// cors
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3001', 'https://volgsysteem.anthonyaichouche.be'],
    credentials: true,
}));
app.use(express.json());

//middleware
const authenticate = require('./middleware/authenticate');
app.use((req, res, next) => {
    // if res is login or logout
    if (req.path === '/login' || req.path === '/login/logout') {
        next();
    } else {
        authenticate(req, res, next);
    }
});

//routes importeren
const routes = require('./routes');
app.use('/', routes);

// port 3000
app.listen(port, () => {
    console.log('🚀 Server running on port ' + port);
});