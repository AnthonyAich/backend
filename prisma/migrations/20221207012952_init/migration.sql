/*
  Warnings:

  - You are about to drop the `attendee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classcourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classrole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userclass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `author` DROP FOREIGN KEY `Author_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `author` DROP FOREIGN KEY `Author_userId_fkey`;

-- DropForeignKey
ALTER TABLE `classcourse` DROP FOREIGN KEY `ClassCourse_classId_fkey`;

-- DropForeignKey
ALTER TABLE `classcourse` DROP FOREIGN KEY `ClassCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `module` DROP FOREIGN KEY `Module_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_meetingId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userclass` DROP FOREIGN KEY `UserClass_classId_fkey`;

-- DropForeignKey
ALTER TABLE `userclass` DROP FOREIGN KEY `UserClass_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userclass` DROP FOREIGN KEY `UserClass_userId_fkey`;

-- DropTable
DROP TABLE `attendee`;

-- DropTable
DROP TABLE `author`;

-- DropTable
DROP TABLE `class`;

-- DropTable
DROP TABLE `classcourse`;

-- DropTable
DROP TABLE `classrole`;

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `meeting`;

-- DropTable
DROP TABLE `module`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `room`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `userclass`;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `gebruikersNaam` VARCHAR(191) NOT NULL,
    `familieNaam` VARCHAR(191) NOT NULL,
    `voorNaam` VARCHAR(191) NOT NULL,
    `sorteerNaam` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroepStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groepId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rappot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `extraMinuten` INTEGER NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `OpdrachtElementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VraagStudent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beschrijving` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,
    `rapportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpdrachtElement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beschrijving` VARCHAR(191) NOT NULL,
    `minuten` INTEGER NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,
    `opdrachtId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opdracht` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroepStudent` ADD CONSTRAINT `GroepStudent_groepId_fkey` FOREIGN KEY (`groepId`) REFERENCES `Groep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroepStudent` ADD CONSTRAINT `GroepStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rappot` ADD CONSTRAINT `Rappot_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rappot` ADD CONSTRAINT `Rappot_OpdrachtElementId_fkey` FOREIGN KEY (`OpdrachtElementId`) REFERENCES `OpdrachtElement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VraagStudent` ADD CONSTRAINT `VraagStudent_rapportId_fkey` FOREIGN KEY (`rapportId`) REFERENCES `Rappot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpdrachtElement` ADD CONSTRAINT `OpdrachtElement_opdrachtId_fkey` FOREIGN KEY (`opdrachtId`) REFERENCES `Opdracht`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
