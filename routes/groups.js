const express = require('express');
const crypto = require('crypto');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

// csv-parser
const csv = require('csv-parser');
const { check } = require('express-validator');
const { log } = console;

router.get('/getMyGroups', [
    check('studentId').not().isEmpty().withMessage('Student id is required')
], async (req, res) => {
    try {
        const userId = req.student.studentId;
        const groups = await prisma.groepStudent.findMany({
            where: {
                studentId: userId,
                geldig: 1
            },
            include: {
                groep: 1
            }
        });
        console.log("groups: ", groups);

        // get amount of opdrachtElementen per groep
        const opdrachtElementenPerGroep = await prisma.opdracht.findMany({
            where: {
                groepId: {
                    in: groups.map(groep => groep.groepId)
                }
            },
            select: {
                groepId: true,
                // where geldig = 1
                opdrachtElementen: {
                    where: {
                        geldig: 1

                    }
                }
            }
        });

        // count the amount of opdrachtElementen per groep
        opdrachtElementenPerGroep.forEach(groep => {
            groep.opdrachtElementen = groep.opdrachtElementen.length;
        });

        // add the amount of opdrachtElementen to the groep if amount is > 0 or set to 0
        groups.forEach(groep => {
            const opdrachtElementen = opdrachtElementenPerGroep.find(opdracht => opdracht.groepId === groep.groepId);
            groep.groep.opdrachtElementen = opdrachtElementen ? opdrachtElementen.opdrachtElementen : 0;
        });

        console.log("groep met aantal: ", groups);

        console.log("elementen: ", opdrachtElementenPerGroep);


        //checken als groepen geldig zijn
        const geldigGroepen = groups.filter(groep => groep.groep.geldig === 1);

        // enkel groepen teruggeven
        const groepen = geldigGroepen.map(groep => groep.groep);

        res.status(200).json(groepen);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

// getUsersByGroupId
router.get('/getUsersByGroupId/:id', [
    check('id').not().isEmpty().withMessage('Group id is required')
], async (req, res) => {
    try {
        const users = await prisma.groepStudent.findMany({
            where: {
                groepId: req.params.id,
                geldig: 1
            },
            include: {
                student: true
            }
        });
        //get the users who are valid
        const geldigUsers = users.filter(user => user.student.geldig === 1);
        // and only return the users
        const usersOnly = geldigUsers.map(user => user.student);

        res.status(200).json(geldigUsers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

// deleteStudentFromGroup post
router.get('/deleteStudentFromGroup/:groupId/:userId', [
    check('userId').not().isEmpty().withMessage('User id is required'),
    check('groupId').not().isEmpty().withMessage('Group id is required')
], async (req, res) => {
    try {
        const studentId = req.params.userId;
        const groupId = req.params.groupId;
        // to string
        const studentIdString = studentId.toString();
        const groupIdString = groupId.toString();
        const { id } = await prisma.groepStudent.findFirst({
            where: {
                groepId: groupIdString,
                studentId: studentIdString
            }
        });

        const studentDeleted = await prisma.groepStudent.delete({
            where: {
                id: id
            }
        });
        res.status(200).json(studentDeleted);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

// /groups/addUsersCsvToGroup/${id}`, file
router.post('/addUsersCsvToGroup/:id', [
    check('file').not().isEmpty().withMessage('File is required')
], async (req, res) => {
    try {
        const groupId = req.params.id;
        const file = req.body;

        // read csv file
        file.pipe(csv())
            .on('data', async (row) => {
                // check if student exists
                const student = await prisma.student.findFirst({
                    where: {
                        studentId: row.studentId
                    }
                });
                // if student exists
                if (student) {
                    // check if student is already in group
                    const studentInGroup = await prisma.groepStudent.findFirst({
                        where: {
                            groepId: groupId,
                            studentId: row.studentId
                        }
                    });
                    // if student is not in group
                    if (!studentInGroup) {
                        // add student to group
                        const studentAdded = await prisma.groepStudent.create({
                            data: {
                                groepId: groupId,
                                studentId: row.studentId
                            }
                        });
                        log(studentAdded);
                    }
                }
            })
            .on('end', () => {
                log('CSV file successfully processed');
            });
        res.status(200).json('CSV file successfully processed');
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
});

// deleteGroupById
router.post('/deleteGroup/', [
    check('id').not().isEmpty().withMessage('Group id is required')
], async (req, res) => {
    try {
        const groupId = req.body.id;
        const groupDeleted = await prisma.groep.update({
            where: {
                id: groupId
            },
            data: {
                geldig: 0
            }
        });
        res.status(200).json(groupDeleted);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
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

// add groep and groepStudent (req.body.groupName)
router.post('/add', [
    check('groupName').not().isEmpty().withMessage('Group name is required'),
], async (req, res) => {
    try {
        const course = await prisma.groep.create({
            data: {
                id: crypto.randomUUID(),
                naam: req.body.groupName,
                aanmaakDatum: new Date(),
                geldig: 1,
            }
        });

        const groepStudent = await prisma.groepStudent.create({
            data: {
                id: crypto.randomUUID(),
                groepId: course.id,
                studentId: req.student.studentId,
                aanmaakDatum: new Date(),
                geldig: 1,
            }
        });
        res.json(course);
    } catch (error) {
        console.log(error.message);
        res.json(error);
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
        const groupById = await prisma.groep.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.json(groupById);
    } catch (error) {
        res.json(error);
    }
});

// searchGroepByName {name} post
router.post('/searchGroepByName', [
    check('name').not().isEmpty().withMessage('Group name id is required'),
], async (req, res) => {
    try {
        const userId = req.student.studentId;
        const groupStudents = await prisma.groepStudent.findMany({
            where: {
                studentId: userId,
                geldig: 1,
            },
        });

        const groups = await prisma.groep.findMany({
            where: {
                naam: {
                    contains: req.body.name,
                },
                geldig: 1,
                id: {
                    in: groupStudents.map(groupStudent => groupStudent.groepId),
                },
            },
        });

        res.json(groups);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;