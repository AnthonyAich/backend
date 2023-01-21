const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');


async function main() {
    //anthony
    const anthony = await prisma.student.upsert({
        where: { id: "5e5d5b5e-b564-4e64-a56e-7fbbb6fd8e1a" },
        update: {
        },
        create: {
            id: "5e5d5b5e-b564-4e64-a56e-7fbbb6fd8e1a",
            code: "$2a$12$MiESlMC./UH234NlYEy1a.ZDET/S3/TkMSr1LKn7UuynRiDFS0zwi",
            gebruikersNaam: "074662aa",
            familieNaam: "Aichouche",
            voorNaam: "Anthony",
            sorteerNaam: "AichoucheAnthony",
            email: "anthony.aichouche@student.hogent.be",
            aanmaakDatum: new Date(),
            geldig: 1,
            role: "Admin",
        }
    });

    const wilma = await prisma.student.upsert({
        where: { id: "c0b5b2a1-0b1f-4b0f-8b1f-0b1f4b0f8b1f" },
        update: {
        },
        create: {
            id: "c0b5b2a1-0b1f-4b0f-8b1f-0b1f4b0f8b1f",
            code: "$2a$12$MiESlMC./UH234NlYEy1a.ZDET/S3/TkMSr1LKn7UuynRiDFS0zwi",
            gebruikersNaam: "074662aa",
            familieNaam: "Saalo",
            voorNaam: "Wilma",
            sorteerNaam: "SaaloWilma",
            email: "wilma.saalo@gmail.com",
            aanmaakDatum: new Date(),
            geldig: 1,
            role: "Student",
        }
    });

    const groepWeb1 = await prisma.groep.upsert({
        where: {
            id: "48d7a3ef-f16e-40f3-a42e-7c9d6a8b7c70"
        },
        update: {
        },
        create: {
            id: "48d7a3ef-f16e-40f3-a42e-7c9d6a8b7c70",
            naam: "Web1",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepWeb2 = await prisma.groep.upsert({
        where: {
            id: "cce6cb72-6e8f-42c2-b72a-b6d2f7b826b9"
        },
        update: {
        },
        create: {
            id: "cce6cb72-6e8f-42c2-b72a-b6d2f7b826b9",
            naam: "Web2",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepWeb3 = await prisma.groep.upsert({
        where: {
            id: "0d1c3f3f-8b20-4481-b7d6-d9f5313b6f9b"
        },
        update: {
        },
        create: {
            id: "0d1c3f3f-8b20-4481-b7d6-d9f5313b6f9b",
            naam: "Web3",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepWeb4 = await prisma.groep.upsert({
        where: {
            id: "606f6772-e8e6-4791-b56d-ce28f7e8ac50"
        },
        update: {
        },
        create: {
            id: "606f6772-e8e6-4791-b56d-ce28f7e8ac50",
            naam: "Web4",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepDigWo1 = await prisma.groep.upsert({
        where: {
            id: "d4596c63-f7b8-4dd5-b7f4-72d88fa3b879"
        },
        update: {
        },
        create: {
            id: "d4596c63-f7b8-4dd5-b7f4-72d88fa3b879",
            naam: "DigWo1",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepDigWo2 = await prisma.groep.upsert({
        where: {
            id: "53b5d5cb-2e61-4b14-a7e4-d1a539f3f979"
        },
        update: {
        },
        create: {
            id: "53b5d5cb-2e61-4b14-a7e4-d1a539f3f979",
            naam: "DigWo2",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const groepOntwerp = await prisma.groep.upsert({
        where: {
            id: "cc0745e5-5f5f-4b64-b1a5-d936f18f976e"
        },
        update: {
        },
        create: {
            id: "cc0745e5-5f5f-4b64-b1a5-d936f18f976e",
            naam: "Ontwerp",
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyWeb1 = await prisma.groepStudent.upsert({
        where: {
            id: "92f66372-10cf-4a12-80dc-7bea24c9d965"
        },
        update: {
        },
        create: {
            id: "92f66372-10cf-4a12-80dc-7bea24c9d965",
            groepId: groepWeb1.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyWeb2 = await prisma.groepStudent.upsert({
        where: {
            id: "5b9c6b70-6b67-47dd-8b2c-7b75e6b2d7e8"
        },
        update: {
        },
        create: {
            id: "5b9c6b70-6b67-47dd-8b2c-7b75e6b2d7e8",
            groepId: groepWeb2.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyWeb3 = await prisma.groepStudent.upsert({
        where: {
            id: "c9b77d3c-aa86-40cf-a3f3-7d826f9ef2ab"
        },
        update: {
        },
        create: {
            id: "c9b77d3c-aa86-40cf-a3f3-7d826f9ef2ab",
            groepId: groepWeb3.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyWeb4 = await prisma.groepStudent.upsert({
        where: {
            id: "fa9a7559-8f15-4f7e-aa19-17a7d2a3b66e"
        },
        update: {
        },
        create: {
            id: "fa9a7559-8f15-4f7e-aa19-17a7d2a3b66e",
            groepId: groepWeb4.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyDigWo1 = await prisma.groepStudent.upsert({
        where: {
            id: "2d07bacc-5dd5-44b5-a0a1-12e7b8fdf6c9"
        },
        update: {
        },
        create: {
            id: "2d07bacc-5dd5-44b5-a0a1-12e7b8fdf6c9",
            groepId: groepDigWo1.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyDigWo2 = await prisma.groepStudent.upsert({
        where: {
            id: "cbf6fcd7-8cb3-4e7a-a3a3-7b837f0b947a"
        },
        update: {
        },
        create: {
            id: "cbf6fcd7-8cb3-4e7a-a3a3-7b837f0b947a",
            groepId: groepDigWo2.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const anthonyOntwerp = await prisma.groepStudent.upsert({
        where: {
            id: "0e0e2f0d-6413-4f4f-b4d4-6c77e6e9f6b5"
        },
        update: {
        },
        create: {
            id: "0e0e2f0d-6413-4f4f-b4d4-6c77e6e9f6b5",
            groepId: groepOntwerp.id,
            studentId: anthony.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    const wilmaWeb4 = await prisma.groepStudent.upsert({
        where: {
            id: "f9b5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a"
        },
        update: {
        },
        create: {
            id: "f9b5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a",
            groepId: groepWeb4.id,
            studentId: wilma.id,
            aanmaakDatum: new Date(),
            geldig: 1,
        }
    });

    // opdracht aanmaken "Basis reactOpdracht"
    const basisReactOpdracht = await prisma.opdracht.upsert({
        where: {
            id: "b1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a"
        },
        update: {
        },
        create: {
            id: "b1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a",
            naam: "Basis reactOpdracht",
            aanmaakDatum: new Date(),
            geldig: 1,
            groepId: groepWeb3.id,
        }
    });

    // opdracht aanmaken "basis linux server"
    const basisLinuxServer = await prisma.opdracht.upsert({
        where: { //id= new random uuid
            id: "yvp5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a"
        },
        update: {
        },
        create: {
            id: "yvp5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a",
            naam: "basis linux server",
            aanmaakDatum: new Date(),
            geldig: 1,
            groepId: groepDigWo1.id,
        }
    });

    // deelopdracht aanmaken "navbar maken react"
    // minuten = new date + 5h
    const navbarMakenReact = await prisma.opdrachtElement.upsert({
        where: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a"
        },
        update: {
        },
        create: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2a",
            beschrijving: "Navbar maken react",
            minuten: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
            aanmaakDatum: new Date(),
            geldig: 1,
            opdrachtId: basisReactOpdracht.id,
        }
    });

    // deelopdracht aanmaken "main request maken met useQuery"
    // minuten = new date + 1h
    const mainRequestMakenMetUseQuery = await prisma.opdrachtElement.upsert({
        where: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2b"
        },
        update: {
        },
        create: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2b",
            beschrijving: "Main request maken met useQuery",
            minuten: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
            aanmaakDatum: new Date(),
            geldig: 1,
            opdrachtId: basisReactOpdracht.id,
        }
    });

    // deelopdracht aanmaken "footer aanmaken react"
    // minuten = new date + 2h

    const footerAanmakenReact = await prisma.opdrachtElement.upsert({
        where: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2c"
        },
        update: {
        },
        create: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2c",
            beschrijving: "Footer aanmaken react",
            minuten: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
            aanmaakDatum: new Date(),
            geldig: 1,
            opdrachtId: basisReactOpdracht.id,
        }
    });

    //sudo apt update && sudo apt upgrade deelopdracht aanmaken
    // minuten = new date + 1h
    const sudoAptUpdate = await prisma.opdrachtElement.upsert({
        where: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2d"
        },
        update: {
        },
        create: {
            id: "a1a5b2a1-1b1f-4b1f-9b2a-1b1f4b1f9b2d",
            beschrijving: "Sudo apt update && sudo apt upgrade",
            minuten: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
            aanmaakDatum: new Date(),
            geldig: 1,
            opdrachtId: basisLinuxServer.id,
        }
    });

    console.log(
        "users: ", anthony, wilma,
        "groepen: ", groepWeb1, groepWeb2, groepWeb3, groepWeb4, groepDigWo1, groepDigWo2, groepOntwerp,
        "groepStudenten: ", anthonyWeb1, anthonyWeb2, anthonyWeb3, anthonyWeb4, anthonyDigWo1, anthonyDigWo2, anthonyOntwerp, wilmaWeb4,
        "opdrachten: ", basisReactOpdracht,
        "deelopdrachten: ", navbarMakenReact, mainRequestMakenMetUseQuery, footerAanmakenReact, sudoAptUpdate
    );
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