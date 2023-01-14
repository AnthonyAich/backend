const express = require('express');
//prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// het router object uit express gebruiken
const router = express.Router();

router.get('/getMyMeetings', async (req, res) => {
    try {
        // inlude attendee ant meeting
        const meetings = await prisma.attendee.findMany({
            where: {
                userId: parseInt(req.user.userId),
            },
            include: {
                Meeting: true,
                ClassRole: true
            },
        });

        const meetingIds = meetings.map(meeting => meeting.meetingId);
        const classRoleTeacher = await prisma.classRole.findFirst({
            where: {
                name: 'Teacher'
            },
            include: {
                Attendee: {
                    where: {
                        meetingId: {
                            in: meetingIds
                        }
                    },
                    include: {
                        User: true
                    }
                }
            }
        });

        classRoleTeacher.Attendee.forEach(attendee => {
            meetings.forEach(meeting => {
                if (meeting.meetingId === attendee.meetingId) {
                    meeting.teacher = attendee.User;
                }
            });
        });

        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json("internal server error - getMyMeetings");
    }
});

//get meeting by id
router.get('/getMeetingById/:id', async (req, res) => {
    try {
        const meeting = await prisma.meeting.findFirst({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                Attendee: {
                    include: {
                        User: true,
                        ClassRole: true
                    }
                }
            },
            include: {
                Room: true
            }
        });
        console.log(meeting);
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json("internal server error - getMeetingById");
    }
});

//exporteren van het router object
module.exports = router;