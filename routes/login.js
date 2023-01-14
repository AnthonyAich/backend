const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');

// het router object uit express gebruiken
const router = express.Router();

// login post
router.post('/', [
    check('email', 'Please enter a valid email').isEmail().exists(),
    check('password', 'Please enter a password').exists(),
], async (req, res) => {
    console.log("login post");
    console.log(req.body.email);
    try {
        const user = await prisma.student.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            const studentId = user.id;
            const userRole = user.role;
            // check bcrypt password
            const validPassword = await bcrypt.compare(req.body.password, user.code);
            if (validPassword) {
                const accessToken = jwt.sign({ studentId, userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
                res.cookie('token', accessToken, { httpOnly: true, maxAge: 28800000, secure: false });
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// logout post
router.post('/logout', async (req, res) => {
    try {
        console.log("logout post");
        res.clearCookie('token');
        res.json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;