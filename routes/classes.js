const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

// get all classes
router.get('/getAll', async (req, res) => {
    try {
        const classes = await prisma.class.findMany();
        res.json(classes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// search class find first 5
router.get('/search', async (req, res) => {
    try {
        const classes = await prisma.class.findMany({
            take: 5,
            where: {
                OR: [
                    { name: { contains: req.query.q } },
                    { description: { contains: req.query.q } },
                ],
            },
        });
        res.json(classes);
    } catch (error) {
        res.json(error);
    }

});

// post route update class by id
router.post('/update/:id', async (req, res) => {
    try {
        const classDeleted = await prisma.class.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: req.body.name,
                description: req.body.description,
            },
        });
        res.json(classDeleted);
    } catch (error) {
        res.json(error);
    }
});

// delete class by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const classDeleted = await prisma.class.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(classDeleted);
    } catch (error) {
        res.json(error);
    }
});

// add class
router.post('/add', async (req, res) => {
    try {
        const classAdded = await prisma.class.create({
            data: {
                name: req.body.name,
                description: req.body.description,
            },
        });
        res.json(classAdded);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;