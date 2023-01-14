/*
  Warnings:

  - The primary key for the `groep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `groepstudent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `opdracht` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `opdrachtelement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rappot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vraagstudent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `groepstudent` DROP FOREIGN KEY `GroepStudent_groepId_fkey`;

-- DropForeignKey
ALTER TABLE `groepstudent` DROP FOREIGN KEY `GroepStudent_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `opdrachtelement` DROP FOREIGN KEY `OpdrachtElement_opdrachtId_fkey`;

-- DropForeignKey
ALTER TABLE `rappot` DROP FOREIGN KEY `Rappot_OpdrachtElementId_fkey`;

-- DropForeignKey
ALTER TABLE `rappot` DROP FOREIGN KEY `Rappot_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `vraagstudent` DROP FOREIGN KEY `VraagStudent_rapportId_fkey`;

-- AlterTable
ALTER TABLE `groep` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `groepstudent` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `groepId` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `opdracht` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `opdrachtelement` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `opdrachtId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rappot` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `OpdrachtElementId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vraagstudent` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `rapportId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

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
