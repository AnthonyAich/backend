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
            const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });
            console.log(accessToken);
            res.status(200).json(accessToken);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;