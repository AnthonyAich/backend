const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

// get all users
router.get('/getAll', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// search user find first
router.post('/search', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            take: 5,
            where: {
                OR: [
                    { firstName: { contains: req.body.username } },
                    { lastName: { contains: req.body.username } },
                    { email: { contains: req.body.username } },
                ],
            },
        });
        res.json(users);
    } catch (error) {
        res.json(error);
    }

});

//get myself
router.get('/getMyself', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: req.user.userId,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// post route update user by id
router.post('/update/', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.body.id) },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

//get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// add user
router.post('/add', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});


//exporteren van het router object
module.exports = router;