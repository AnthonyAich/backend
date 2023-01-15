const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');

const crypto = require('crypto');

// het router object uit express gebruiken
const router = express.Router();

// login post
router.post('/', [
    check('email', 'Please enter a valid email').isEmail().exists(),
    check('password', 'Please enter a password').exists(),
], async (req, res) => {
    console.log("login post");
    console.log("email: ", req.body.email);
    console.log("password: ", req.body.password);
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
                res.cookie('token', accessToken, { httpOnly: true, maxAge: 28800000, secure: true, SameSite: 'None' });
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

// register{firstName, lastName, email, password, role} post
router.post('/register', [
    check('firstName', 'Please enter a valid first name').exists(),
    check('lastName', 'Please enter a valid last name').exists(),
    check('email', 'Please enter a valid email').isEmail().exists(),
    check('password', 'Please enter a password').exists(),
    check('role', 'Please enter a valid role').exists(),
], async (req, res) => {
    try {
        console.log("register post");
        const user = await prisma.student.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            res.status(401).json({ error: 'User already exists' });
        } else {
            console.log("Password ", req.body.password);
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await prisma.student.create({
                data: {
                    id: crypto.randomUUID(),
                    code: hashedPassword,
                    gebruikersNaam: req.body.lastName + req.body.firstName,
                    familieNaam: req.body.lastName,
                    voorNaam: req.body.firstName,
                    sorteerNaam: req.body.lastName + req.body.firstName,
                    email: req.body.email,
                    aanmaakDatum: new Date(),
                    geldig: 1,
                    role: req.body.role,
                },
            });

            const newGroepStudent = await prisma.groepStudent.create({
                data: {
                    id: crypto.randomUUID(),
                    groepId: '606f6772-e8e6-4791-b56d-ce28f7e8ac50',
                    studentId: newUser.id,
                    aanmaakDatum: new Date(),
                    geldig: 1,
                },
            });
            // d4596c63-f7b8-4dd5-b7f4-72d88fa3b879
            const newStudentOpleiding = await prisma.groepStudent.create({
                data: {
                    id: crypto.randomUUID(),
                    studentId: newUser.id,
                    groepId: 'd4596c63-f7b8-4dd5-b7f4-72d88fa3b879',
                    aanmaakDatum: new Date(),
                    geldig: 1,
                },
            });
            // cce6cb72-6e8f-42c2-b72a-b6d2f7b826b9
            const newStudentOpleiding2 = await prisma.groepStudent.create({
                data: {
                    id: crypto.randomUUID(),
                    studentId: newUser.id,
                    groepId: 'cce6cb72-6e8f-42c2-b72a-b6d2f7b826b9',
                    aanmaakDatum: new Date(),
                    geldig: 1,
                },
            });

            const { id: studentId, role: userRole } = newUser;
            const accessToken = jwt.sign({ studentId, userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
            res.cookie('token', accessToken, { httpOnly: true, maxAge: 28800000, secure: true, SameSite: 'None' });
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;