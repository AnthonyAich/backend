const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

router.get('/getMyClasses', async (req, res) => {
    try {
        // inlude attendee ant meeting
        const classes = await prisma.userClass.findMany({
            where: {
                userId: parseInt(req.user.userId),
            },
            include: {
                Class: true,
                ClassRole: true
            },
        });

        //delete class where multiple class.id is same
        // filter arguments are: (value, index, array)
        const uniqueClasses = classes.filter((singleClass, index, arrayMyself) =>
            index === arrayMyself.findIndex((foundClassInArray) => (
                foundClassInArray.classId === singleClass.classId
            ))
        )
        const classIds = uniqueClasses.map(singleClass => singleClass.classId);
        const classRoleTeacher = await prisma.classRole.findFirst({
            where: {
                name: 'Teacher'
            },
            include: {
                UserClass: {
                    where: {
                        classId: {
                            in: classIds
                        }
                    },
                    include: {
                        User: true
                    }
                }
            }
        });
        classRoleTeacher.UserClass.forEach(userClass => {
            uniqueClasses.forEach(singleClass => {
                if (singleClass.classId === userClass.classId) {
                    singleClass.teacher = userClass.User;
                }
            });
        });


        res.status(200).json(uniqueClasses);
    } catch (error) {
        res.status(500).json("internal server error - getMyMeetings");
    }
});
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

//getClassById
router.get('/getById/:id', async (req, res) => {
    try {
        const classById = await prisma.class.findFirst({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                UserClass: {
                    include: {
                        User: true,
                        ClassRole: true
                    }
                }
            }
        });
        res.json(classById);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;