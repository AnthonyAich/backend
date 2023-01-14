/*
  Warnings:

  - Changed the type of `minuten` on the `opdrachtelement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `opdrachtelement` DROP COLUMN `minuten`,
    ADD COLUMN `minuten` DATETIME(3) NOT NULL;
