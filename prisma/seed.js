const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // roles
    const adminRole = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Admin',
        }
    });

    const userRole = await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'User',
        }
    });

    // users
    const anthony = await prisma.user.upsert({
        where: { email: 'anthony.aichouche@student.hogent.be' },
        update: {},
        create: {
            id: 1,
            email: 'anthony.aichouche@student.hogent.be',
            firstName: 'Anthony',
            lastName: 'Aichouche',
            password: '123456',
            roleId: 1,
        }
    });

    const claude = await prisma.user.upsert({
        where: { email: 'claude.monet@gmail.com' },
        update: {},
        create: {
            id: 2,
            email: 'claude.monet@gmail.com',
            firstName: 'Claude',
            lastName: 'Monet',
            password: '123456',
            roleId: 2,
        }
    });

    const vincent = await prisma.user.upsert({
        where: {
            email: 'vincent.vangogh@gmail.com'
        },
        update: {},
        create: {
            id: 3,
            email: 'vincent.vangogh@gmail.com',
            firstName: 'Vincent',
            lastName: 'Van Gogh',
            password: '123456',
            roleId: 2,
        }
    });

    const frida = await prisma.user.upsert({
        where: {
            email: 'frida.khalo@gmail.com'
        },
        update: {},
        create: {
            id: 4,
            email: 'frida.khalo@gmail.com',
            firstName: 'Frida',
            lastName: 'Khalo',
            password: '123456',
            roleId: 2,
        }
    });

    const pablo = await prisma.user.upsert({
        where: {
            email: 'pablo.picasso@gmail.com'
        },
        update: {},
        create: {
            id: 5,
            email: 'pablo.picasso@gmail.com',
            firstName: 'Pablo',
            lastName: 'Picasso',
            password: '123456',
            roleId: 2,
        }
    });

    const salvador = await prisma.user.upsert({
        where: {
            email: 'salvador.dalí@gmail.com'
        },
        update: {},
        create: {
            id: 6,
            email: 'salvador.dalí@gmail.com',
            firstName: 'Salvador',
            lastName: 'Dalí',
            password: '123456',
            roleId: 2,
        }
    });

    const danielCraig = await prisma.user.upsert({
        where: {
            email: 'daniel.craig@gmail.com'
        },
        update: {},
        create: {
            id: 7,
            email: 'daniel.craig@gmail.com',
            firstName: 'Daniel',
            lastName: 'Craig',
            password: '123456',
            roleId: 2,
        }
    });

    const annaDeArmas = await prisma.user.upsert({
        where: {
            email: 'anna.dearmas@gmail.com'
        },
        update: {},
        create: {
            id: 8,
            email: 'anna.dearmas@gmail.com',
            firstName: 'Anna',
            lastName: 'De Armas',
            password: '123456',
            roleId: 2,
        }
    });

    const ramiMalek = await prisma.user.upsert({
        where: {
            email: 'rami.malek@gmail.com'
        },
        update: {},
        create: {
            id: 9,
            email: 'rami.malek@gmail.com',
            firstName: 'Rami',
            lastName: 'Malek',
            password: '123456',
            roleId: 2,
        }
    });

    const leaSeydoux = await prisma.user.upsert({
        where: {
            email: 'lea.seydoux@gmail.com'
        },
        update: {},
        create: {
            id: 10,
            email: 'lea.seydoux@gmail.com',
            firstName: 'Lea',
            lastName: 'Seydoux',
            password: '123456',
            roleId: 2,
        }
    });

    const leonardo = await prisma.user.upsert({
        where: {
            email: 'leonardo.davinci@gmail.com'
        },
        update: {},
        create: {
            id: 11,
            email: 'leonardo.davinci@gmail.com',
            firstName: 'Leonardo',
            lastName: 'Da Vinci',
            password: '123456',
            roleId: 2,
        }
    });

    const noam = await prisma.user.upsert({
        where: {
            email: 'noam.chomsky@gmail.com'
        },
        update: {},
        create: {
            id: 12,
            email: 'noam.chomsky@gmail.com',
            firstName: 'Noam',
            lastName: 'Chomsky',
            password: '123456',
            roleId: 2,
        }
    });

    const michel = await prisma.user.upsert({
        where: {
            email: 'michel.foucault@gmail.com'
        },
        update: {},
        create: {
            id: 13,
            email: 'michel.foucault@gmail.com',
            firstName: 'Michel',
            lastName: 'Foucault',
            password: '123456',
            roleId: 2,
        }
    });


    // courses
    const gitHubCursus = await prisma.course.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Basis GitHub',
            description: 'Basis GitHub cursus',
        }
    });

    const htmlCursus = await prisma.course.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'HTML basis',
            description: 'Basis van HTML',
        }
    });

    const sfumatoCursus = await prisma.course.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'de sfumato techniek van Leonardo Da Vinci',
            description: 'Sfumato cursus door Leonardo Da Vinci',
        }
    });

    const leonardoTechnischTekenen = await prisma.course.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'Technisch tekenen door Leonardo Da Vinci',
            description: 'Technisch tekenen cursus door Leonardo Da Vinci',
        }
    });

    const onHumanNature = await prisma.course.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            name: 'The Chomsky-Foucault Debate: On Human Nature',
            description: 'The Chomsky-Foucault Debate: On Human Nature cursus',
        }
    });

    // classes
    const artistClass = await prisma.class.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Kunstenaar(essen)(s)',
            description: 'Klas voor artiesten',
        }
    });

    const developerClass = await prisma.class.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'Developer(s)',
            description: 'Klas voor developers',
        }
    });

    const actorClass = await prisma.class.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'Acteur(s)',
            description: 'Klas voor acteurs',
        }
    });


    // class roles
    const studentRole = await prisma.classRole.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Student',
        }
    });

    const teacherRole = await prisma.classRole.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'Teacher',
        }
    });

    // userclass
    const anthonyDevStudent = await prisma.userClass.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            userId: anthony.id,
            classId: developerClass.id,
            roleId: studentRole.id,
        }
    });

    const claudeArtStudent = await prisma.userClass.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            userId: claude.id,
            classId: artistClass.id,
            roleId: studentRole.id,
        }
    });

    const vincentArtStudent = await prisma.userClass.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            userId: vincent.id,
            classId: artistClass.id,
            roleId: studentRole.id,
        }
    });

    const fridaArtTeacher = await prisma.userClass.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            userId: frida.id,
            classId: artistClass.id,
            roleId: teacherRole.id,
        }
    });

    const pabloArtStudent = await prisma.userClass.upsert({
        where: { id: 5 },
        update: {},

        create: {
            id: 5,
            userId: pablo.id,
            classId: artistClass.id,
            roleId: studentRole.id,
        }
    });

    const salvadorArtStudent = await prisma.userClass.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            userId: salvador.id,
            classId: artistClass.id,
            roleId: studentRole.id,
        }
    });

    const danielActorStudent = await prisma.userClass.upsert({
        where: { id: 7 },
        update: {},
        create: {
            id: 7,
            userId: danielCraig.id,
            classId: actorClass.id,
            roleId: studentRole.id,
        }
    });

    const annaActorStudent = await prisma.userClass.upsert({
        where: { id: 8 },
        update: {},
        create: {
            id: 8,
            userId: annaDeArmas.id,
            classId: actorClass.id,
            roleId: studentRole.id,
        }
    });

    const ramiActorStudent = await prisma.userClass.upsert({
        where: { id: 9 },
        update: {},
        create: {
            id: 9,
            userId: ramiMalek.id,
            classId: actorClass.id,
            roleId: studentRole.id,
        }
    });

    const leaActorTeacher = await prisma.userClass.upsert({
        where: { id: 10 },
        update: {},
        create: {
            id: 10,
            userId: leaSeydoux.id,
            classId: actorClass.id,
            roleId: teacherRole.id,
        }
    });

    // Module
    const gitHubModuleWatIsHet = await prisma.module.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Wat is GitHub?',
            description: 'In dit deel zal je de basis zien van wat github eigenlijk is?',
            courseId: gitHubCursus.id,
        }
    });

    const gitHubModuleHoeWerktHet = await prisma.module.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'Hoe werkt GitHub?',
            description: 'In dit deel zal je de basis zien van hoe github werkt?',
            courseId: gitHubCursus.id,
        }
    });

    const htmlModuleWatIsHet = await prisma.module.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'Wat is HTML?',
            description: 'In dit deel zal je de basis zien van wat HTML eigenlijk is?',
            courseId: htmlCursus.id,
        }
    });

    const htmlModuleHoeWerktHet = await prisma.module.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'Hoe werkt HTML?',
            description: 'In dit deel zal je de basis zien van hoe HTML werkt?',
            courseId: htmlCursus.id,
        }
    });

    const sfumatoWatIsHet = await prisma.module.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            name: 'Wat is sfumato?',
            description: 'In dit deel zal je de basis zien van wat sfumato eigenlijk is?',
            courseId: sfumatoCursus.id,
        }
    });

    const sfumatoHoeSchilderJeHet = await prisma.module.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            name: 'Hoe schilder je sfumato?',
            description: 'In dit deel zal je de basis zien van hoe je sfumato schildert?',
            courseId: sfumatoCursus.id,
        }
    });


    // classCourse
    const artistClassSfumato = await prisma.classCourse.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            classId: artistClass.id,
            courseId: sfumatoCursus.id,
        }
    });

    // Author
    const anthonyAuthor = await prisma.author.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            courseId: gitHubCursus.id,
            userId: anthony.id,
        }
    });

    const leonardoAuthor = await prisma.author.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            courseId: sfumatoCursus.id,
            userId: leonardo.id,
        }
    });

    const noamAuthor = await prisma.author.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            courseId: onHumanNature.id,
            userId: noam.id,
        }
    });

    const michelAuthor = await prisma.author.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            courseId: onHumanNature.id,
            userId: michel.id,
        }
    });

    console.log({
        anthony, claude, vincent, frida, pablo, salvador, danielCraig, annaDeArmas, ramiMalek, leaSeydoux, leonardo, noam, michel,
        studentRole, teacherRole, adminRole, userRole,
        gitHubCursus, htmlCursus, sfumatoCursus, onHumanNature, leonardoTechnischTekenen,
        gitHubModuleWatIsHet, gitHubModuleHoeWerktHet, htmlModuleWatIsHet, htmlModuleHoeWerktHet, sfumatoWatIsHet, sfumatoHoeSchilderJeHet,
        artistClass, actorClass, developerClass,
        anthonyDevStudent, claudeArtStudent, vincentArtStudent, fridaArtTeacher, pabloArtStudent, salvadorArtStudent, danielActorStudent, annaActorStudent, ramiActorStudent, leaActorTeacher,
        artistClassSfumato,
        anthonyAuthor, leonardoAuthor, noamAuthor, michelAuthor
    });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });