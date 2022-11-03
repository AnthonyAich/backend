// importeren van de express module
// initialiseren van de express applicatie
const express = require('express');
const app = express();
// importeren van de body-parser module
const bodyParser = require('body-parser');
// dotenv PORT data importeren
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

// cors
const cors = require('cors');
app.use(cors(
    {
        origin: 'http://localhost:3006'
    }
));

app.use(express.json());

//middleware
const authenticate = require('./middleware/authenticate');
app.use((req, res, next) => {
    // if res is login
    if (req.path === '/login') {
        console.log('login');
        next();
    } else {
        // if res is not login
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