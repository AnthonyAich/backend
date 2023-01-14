const express = require('express');
const root = require('./root');
const users = require('./users');
const groups = require('./groups');
const courses = require('./courses');
const login = require('./login');
const meeting = require('./meeting');
const assignments = require('./assignments');

// het router object uit express gebruiken
const router = express.Router();

router.use('/', root);
router.use('/users', users);
router.use('/groups', groups);
router.use('/courses', courses);
router.use('/login', login);
router.use('/assignments', assignments);
router.use('/meeting', meeting);
router.all('*', (req, res) => {
    res.status(404).send(`<p>404 - twerkt nie</p>`);
});

module.exports = router;