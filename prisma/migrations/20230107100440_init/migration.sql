/*
  Warnings:

  - You are about to drop the `rappot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rappot` DROP FOREIGN KEY `Rappot_OpdrachtElementId_fkey`;

-- DropForeignKey
ALTER TABLE `rappot` DROP FOREIGN KEY `Rappot_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `vraagstudent` DROP FOREIGN KEY `VraagStudent_rapportId_fkey`;

-- DropTable
DROP TABLE `rappot`;

-- CreateTable
CREATE TABLE `Rapport` (
    `id` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `extraMinuten` INTEGER NOT NULL,
    `aanmaakDatum` DATETIME(3) NOT NULL,
    `geldig` INTEGER NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `OpdrachtElementId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_OpdrachtElementId_fkey` FOREIGN KEY (`OpdrachtElementId`) REFERENCES `OpdrachtElement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VraagStudent` ADD CONSTRAINT `VraagStudent_rapportId_fkey` FOREIGN KEY (`rapportId`) REFERENCES `Rapport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
