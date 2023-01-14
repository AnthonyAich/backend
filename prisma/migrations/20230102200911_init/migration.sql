/*
  Warnings:

  - Added the required column `groepId` to the `Opdracht` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `opdracht` ADD COLUMN `groepId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Opdracht` ADD CONSTRAINT `Opdracht_groepId_fkey` FOREIGN KEY (`groepId`) REFERENCES `Groep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
