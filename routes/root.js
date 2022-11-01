const express = require('express');

// het router object uit express gebruiken
const router = express.Router();

router.get('/', (req, res) => {
    const obj = {
        name: 'home',
    }
    res.status(200).json(obj);
});

router.post('/', (req, res) => {
    res.status(200).send('<p>Hello from post</p>');
});

//exporteren van het router obbject
module.exports = router;