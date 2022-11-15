const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');

// het router object uit express gebruiken
const router = express.Router();

// login post
router.post('/', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        if (user) {
            const userId = user.id;
            const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });
            res.cookie('token', accessToken, { httpOnly: true, maxAge: 28800000, secure: false });
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// logout post
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;