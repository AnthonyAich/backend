const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csv = require('csv-parser');
const { check } = require('express-validator');

// het router object uit express gebruiken
const router = express.Router();


// get all students
router.get('/getAll', async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get myself
router.get('/getMyself', [
    check('studentId', 'studentId is required').not().isEmpty(),
], async (req, res) => {
    try {
        const student = await prisma.student.findFirst({
            where: {
                id: req.student.studentId,
            },
        });
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// addStudents`, file
router.post('/addStudents', [
    check('csvFile', 'csvFile is required').not().isEmpty(),
], async (req, res) => {
    // The "chunk" argument must be of type string or an instance of Buffer or Uint8Array.Received an instance of Object
    try {
        if (req.student.userRole === 'Admin') {

            console.log("post: addStudents");
            const csvString = req.body.csvFile;
            let path = `./UploadedFiles/${req.student.studentId}.csv`;

            // write the csv file and wait for it to finish writing
            await fs.writeFile(path, csvString, (err) => {
                if (err) throw err;
            });

            // read the csv file and wait for it to finish reading
            const csvFile = await fs.createReadStream(path);

            // parse the csv file
            // with csv-parser
            const students = [];
            csvFile.pipe(csv())
                .on('data', (row) => {
                    students.push(row);
                })
                .on('end', async () => {
                    // get list of emails from prisma student
                    let studentEmails = await prisma.student.findMany({
                        select: {
                            email: true
                        }
                    });
                    studentEmails = studentEmails.map(student => student.email);

                    for (let i = 0; i < students.length; i++) {
                        // check if the student is already in the database
                        if (studentEmails.includes(students[i].Email)) {
                            console.log("Student already in database");
                        }
                        else {

                            const student = await prisma.student.create({
                                data: {
                                    id: crypto.randomUUID(),
                                    code: "$2y$10$/.JylOqtmhLlGFSDUDNz2.0TsW9nhrs2ucocjwoLehe5q61gQiK/m",
                                    gebruikersNaam: students[i].Gebruikersnaam,
                                    familieNaam: students[i].Familienaam,
                                    voorNaam: students[i].Voornaam,
                                    sorteerNaam: students[i].Sorteernaam,
                                    email: students[i].Email,
                                    aanmaakDatum: new Date(),
                                    geldig: 1,
                                    role: "Student",
                                }
                            });
                            console.log(student);
                        }
                    }
                    fs.unlinkSync(path);
                });

            res.status(200).json({ message: 'Students added' });
        } else {
            res.status(403).json({ error: 'Forbidden' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

//exporteren van het router object
module.exports = router;