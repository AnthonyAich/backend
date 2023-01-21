const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const { check } = require('express-validator');
const prisma = new PrismaClient();
const crypto = require('crypto');

// het router object uit express gebruiken
const router = express.Router();

// minuted
function addMinutes(date, minutes) {
    const dateCopy = new Date(date.getTime());
    dateCopy.setMinutes(dateCopy.getMinutes() + parseInt(minutes));

    if (minutes < 0) {
        while (dateCopy < date) {
            dateCopy.setMinutes(dateCopy.getMinutes() + parseInt(minutes));
        }
    }

    return dateCopy;
}

// get all opdrachten where groepId = :id ans get all deelOpdrachten
router.get('/getOpdrachtenByGroepId/:id', [
    check('id').not().isEmpty().withMessage('Group id is required')
], async (req, res) => {
    try {
        const opdrachten = await prisma.opdracht.findMany({
            where: {
                groepId: req.params.id,
                geldig: 1
            },
            include: {
                opdrachtElementen: true
            }
        });
        // delete deelopdrachten with geldig = 0
        const opdrachtenWhoAreGeldig = opdrachten.map(opdracht => {
            const deelOpdrachten = opdracht.opdrachtElementen.filter(deelOpdracht => deelOpdracht.geldig === 1);
            opdracht.opdrachtElementen = deelOpdrachten;
            return opdracht;
        });
        res.status(200).json(opdrachtenWhoAreGeldig);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

// get deelOpdracht by id and get parent opdracht
router.get('/getDeelOpdrachtById/:id', [
    check('id').not().isEmpty().withMessage('Deelopdracht id is required')
], async (req, res) => {
    console.log("Get / getDeelOpdrachtById");
    try {
        const deelOpdracht = await prisma.opdrachtElement.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                opdracht: true
            }
        });
        console.log("opdrachtElement: ", deelOpdracht);
        res.status(200).json(deelOpdracht);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: error.message });
    }
});

// setStatusOfAssignment {id, status}
router.post('/setStatusOfAssignment', [
    check('id').not().isEmpty().withMessage('Deelopdracht id is required'),
    check('status').not().isEmpty().withMessage('Status is required')
], async (req, res) => {
    console.log("Post / setStatusOfAssignment");
    try {
        // check if the rapport already exists
        const rapport = await prisma.rapport.findMany({
            where: {
                OpdrachtElementId: (req.body.id).toString(),
                studentId: (req.student.studentId).toString()
            }
        });

        console.log("rapport: ", rapport);

        // if the rapport exists, update it
        if (rapport.length > 0) {
            const updatedRapport = await prisma.rapport.update({
                where: { id: rapport[0].id },
                data: {
                    status: req.body.status
                }
            });
            res.status(200).json(updatedRapport);
        } else {
            // if the rapport does not exist, create it
            const newRapport = await prisma.rapport.create({
                data: {
                    id: crypto.randomUUID(),
                    status: req.body.status,
                    extraMinuten: 0,
                    aanmaakDatum: new Date(),
                    geldig: 1,
                    studentId: req.student.studentId,
                    OpdrachtElementId: req.body.id
                }
            });
            res.status(200).json(newRapport);
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// setQuestionToRapport {beschrijving, rapportId}
router.post('/setQuestionToRapport', [
    check('beschrijving').not().isEmpty().withMessage('Beschrijving is required'),
    check('vraagId').not().isEmpty().withMessage('Vraag id is required')
], async (req, res) => {
    console.log("Post / setQuestionToRapport");
    try {
        // check if the rapport already exists
        const vraag = await prisma.vraagStudent.create({
            data: {
                id: crypto.randomUUID(),
                beschrijving: req.body.beschrijving,
                aanmaakDatum: new Date(),
                geldig: 1,
                rapportId: req.body.rapportId,
            }
        });
        res.status(200).json(vraag);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});


// get rapport by userId and deelOpdrachtId
router.get('/getRapportByUserIdAndDeelOpdrachtId/:deelOpdrachtId', [
    check('userId').not().isEmpty().withMessage('User id is required'),
    check('deelOpdrachtId').not().isEmpty().withMessage('Deelopdracht id is required')
], async (req, res) => {
    console.log("Get / getRapportByUserIdAndDeelOpdrachtId");
    try {
        const rapport = await prisma.rapport.findMany({
            where: {
                studentId: req.student.studentId,
                OpdrachtElementId: req.params.deelOpdrachtId
            }
        });
        console.log("rapport: ", rapport);
        res.status(200).json(rapport);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: error.message });
    }
});

// getMessagesByDeelOpdrachtId {deelOpdrachtId}
router.get('/getMessagesByRapportId/:rapportId', [
    check('deelOpdrachtId').not().isEmpty().withMessage('Deelopdracht id is required')
], async (req, res) => {
    console.log("Get / getMessagesByDeelOpdrachtId");
    try {
        // find messages with rapportId
        const messages = await prisma.vraagStudent.findMany({
            where: {
                rapportId: req.params.rapportId
            }
        });

        console.log("messages: ", messages);
        res.status(200).json(messages);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: error.message });
    }
});

// askForMoreTime {rapportId, tijd} post
router.post('/askForMoreTime', [
    check('rapportId').not().isEmpty().withMessage('Rapport id is required'),
    check('tijd').not().isEmpty().withMessage('Tijd is required')
], async (req, res) => {
    console.log("Post / askForMoreTime");
    try {
        // check if the rapport already exists
        const rapport = await prisma.rapport.findUnique({
            where: {
                id: req.body.rapportId
            }
        });

        // if the rapport exists, update it
        if (rapport) {
            const updatedRapport = await prisma.rapport.update({
                where: { id: rapport.id },
                data: {
                    extraMinuten: req.body.tijd
                }
            });
            res.status(200).json(updatedRapport);
        } else {
            res.status(500).json({ error: "Rapport not found" });
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// deleteDeelOpdrachtById {deelOpdrachtId} post
router.post('/deleteDeelOpdrachtById', [
    check('deelOpdrachtId').not().isEmpty().withMessage('Deelopdracht id is required')
], async (req, res) => {
    console.log("Post / deleteDeelOpdrachtById");
    try {
        // check if the rapport already exists
        const deelOpdracht = await prisma.opdrachtElement.findUnique({
            where: {
                id: req.body.deelOpdrachtId
            }
        });

        // if the rapport exists, update it
        if (deelOpdracht) {
            const updatedDeelOpdracht = await prisma.opdrachtElement.update({
                where: { id: deelOpdracht.id },
                data: {
                    geldig: 0
                }
            });
            res.status(200).json(updatedDeelOpdracht);
        } else {
            res.status(500).json({ error: "Deelopdracht not found" });
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// model OpdrachtElement {
//   id   String @id
//   beschrijving String
//   minuten DateTime
//   aanmaakDatum DateTime
//   geldig Int
//   opdrachtId String
//   opdracht Opdracht @relation(fields: [opdrachtId], references: [id])
//   Rapport Rapport[]
// }

// addDeelOpdracht {opdrachtId, beschrijving, tijd} post
router.post('/addDeelOpdracht', [
    check('opdrachtId').not().isEmpty().withMessage('Opdracht id is required'),
    check('beschrijving').not().isEmpty().withMessage('Beschrijving is required'),
    check('tijd').not().isEmpty().withMessage('Tijd is required')
], async (req, res) => {

    console.log("Post / addDeelOpdracht");
    try {
        // add 10min to the time
        const tijd = addMinutes(new Date(), req.body.tijd);
        const deelOpdracht = await prisma.opdrachtElement.create({
            data: {
                id: crypto.randomUUID(),
                beschrijving: req.body.beschrijving,
                minuten: tijd,
                geldig: 1,
                aanmaakDatum: new Date(),
                opdrachtId: req.body.opdrachtId,
            }
        });
        res.status(200).json(deelOpdracht);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// addOpdract {groepId, beschrijving} post
router.post('/addOpdracht', [
    check('groepId').not().isEmpty().withMessage('Groep id is required'),
    check('beschrijving').not().isEmpty().withMessage('Beschrijving is required')
], async (req, res) => {
    console.log("Post / addOpdracht");
    try {
        const opdracht = await prisma.opdracht.create({
            data: {
                id: crypto.randomUUID(),
                naam: req.body.beschrijving,
                groepId: req.body.groepId,
                aanmaakDatum: new Date(),
                geldig: 1
            }
        });
        res.status(200).json(opdracht);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// deleteOpdrachtById {opdrachtId} post
router.post('/deleteOpdrachtById', [
    check('opdrachtId').not().isEmpty().withMessage('Opdracht id is required')
], async (req, res) => {
    console.log("Post / deleteOpdrachtById");
    try {
        // check if the rapport already exists
        const opdracht = await prisma.opdracht.findUnique({
            where: {
                id: req.body.opdrachtId
            }
        });
        console.log("opdrachtId: ", req.body.opdrachtId);

        // if the rapport exists, update it
        if (opdracht) {
            const updatedOpdracht = await prisma.opdracht.update({
                where: { id: opdracht.id },
                data: {
                    geldig: 0
                }
            });
            console.log("updatedOpdracht: ", updatedOpdracht);
            res.status(200).json(updatedOpdracht);
        } else {
            console.log("Opdracht not found");
            res.status(500).json({ error: "Opdracht not found" });
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});


// model Rapport {
//   id    String @id
//   status Int
//   extraMinuten Int
//   aanmaakDatum DateTime
//   geldig Int
//   studentId String
//   student Student @relation(fields: [studentId], references: [id])
//   OpdrachtElementId String
//   opdrachtElement OpdrachtElement @relation(fields: [OpdrachtElementId], references: [id])
//   VraagStudent VraagStudent[]
// }

// model VraagStudent {
//   id    String @id
//   beschrijving String
//   aanmaakDatum DateTime
//   geldig Int
//   rapportId String
//   rapport Rapport @relation(fields: [rapportId], references: [id])
// }


// getAllVragenWithOpdrachtElementId {opdrachtElementId} post
router.post('/getAllVragenWithOpdrachtElementId', [
    check('opdrachtElementId').not().isEmpty().withMessage('Opdracht element id is required')
], async (req, res) => {
    console.log("Post / getAllVragenWithOpdrachtElementId");
    try {
        console.log("opdrachtElementId: ", req.body.opdrachtElementId);
        const rapporten = await prisma.rapport.findMany({
            where: {
                OpdrachtElementId: req.body.opdrachtElementId
            },
            include: {
                VraagStudent: true
            }
        });

        // just get the rapporten with vragen not empty
        const rapportenWithVragen = rapporten.filter(r => r.VraagStudent.length > 0);
        res.status(200).json(rapportenWithVragen);
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// getstatusOfEveryoneInOpdrachtElement {opdrachtElementId} get
router.get('/getstatusOfEveryoneInOpdrachtElement/:opdrachtElementId',
    [
        check('opdrachtElementId').not().isEmpty().withMessage('Opdracht element id is required')
    ]
    , async (req, res) => {
        console.log("Get / getstatusOfEveryoneInOpdrachtElement");
        try {
            console.log("opdrachtElementId: ", req.params.opdrachtElementId);
            let rapporten = await prisma.rapport.findMany({
                where: {
                    OpdrachtElementId: req.params.opdrachtElementId
                }
            });

            // filter all rapporten with the same studentId
            rapporten = rapporten.filter((rapport, index, self) =>
                index === self.findIndex((t) => (
                    t.studentId === rapport.studentId
                ))
            );

            const buzy = rapporten.filter(rapport => rapport.status === 1).length;
            const done = rapporten.filter(rapport => rapport.status === 2).length;
            const stopped = rapporten.filter(rapport => rapport.status === 3).length;

            const total = rapporten.length;
            res.status(200).json({
                done,
                buzy,
                stopped,
                total
            });

        } catch (error) {
            console.log("error: ", error.message);
            res.status(500).json({ error: error.message });
        }
    });

// addTimeToOpdrachtElement {opdrachtElementId, time} post
router.post('/addTimeToOpdrachtElement', [
    check('opdrachtElementId').not().isEmpty().withMessage('Opdracht element id is required'),
    check('time').not().isEmpty().withMessage('Time is required')
], async (req, res) => {
    console.log("Post / addTimeToOpdrachtElement");
    try {
        console.log("opdrachtElementId: ", req.body.opdrachtElementId);
        console.log("time: ", req.body.time);
        const opdrachtElement = await prisma.opdrachtElement.findUnique({
            where: {
                id: req.body.opdrachtElementId
            }
        });

        if (opdrachtElement) {
            const updatedOpdrachtElement = await prisma.opdrachtElement.update({
                where: { id: opdrachtElement.id },
                data: {
                    // + time in minutes
                    minuten: addMinutes(opdrachtElement.minuten, req.body.time)
                }
            });
            console.log("updatedOpdrachtElement: ", updatedOpdrachtElement);
            res.status(200).json(updatedOpdrachtElement);
        } else {
            console.log("Opdracht element not found");
            res.status(500).json({ error: "Opdracht element not found" });
        }
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

// getAllRapportenOfOpdrachtElement {opdrachtElementId} post
router.post('/getAllRapportenOfOpdrachtElement', [
    check('opdrachtElementId').not().isEmpty().withMessage('Opdracht element id is required')
], async (req, res) => {
    console.log("Post / getAllRapportenOfOpdrachtElement");
    try {
        console.log("opdrachtElementId: ", req.body.opdrachtElementId);
        const rapporten = await prisma.rapport.findMany({
            where: {
                OpdrachtElementId: req.body.opdrachtElementId,
                geldig: 1
            }
        });

        const extraMinuten1 = rapporten.filter(rapport => rapport.extraMinuten === 1).length;
        const extraMinuten5 = rapporten.filter(rapport => rapport.extraMinuten === 5).length;
        const extraMinuten10 = rapporten.filter(rapport => rapport.extraMinuten === 10).length;

        res.status(200).json({
            extraMinuten1,
            extraMinuten5,
            extraMinuten10
        });
    } catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({ error: error.message });
    }
});


//exporteren van het router object
module.exports = router;