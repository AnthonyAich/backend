const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

// get all courses
router.get('/getAll', async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// search course find first 5
router.get('/search', async (req, res) => {
    try {
        const courses = await prisma.course.findMany({
            take: 5,
            where: {
                OR: [
                    { name: { contains: req.query.q } },
                    { description: { contains: req.query.q } },
                ],
            },
        });
        res.json(courses);
    } catch (error) {
        res.json(error);
    }

});

// post route update course by id
router.post('/update/:id', async (req, res) => {
    try {
        const course = await prisma.course.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: req.body.name,
                description: req.body.description,
            },
        });
        res.json(course);
    } catch (error) {
        res.json(error);
    }
});

// get course by id and parent 


// delete course by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const course = await prisma.course.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(course);
    } catch (error) {
        res.json(error);
    }
}
);

module.exports = router;