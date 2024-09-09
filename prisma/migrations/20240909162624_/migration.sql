/*
  Warnings:

  - You are about to drop the column `handlerId` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the `handler` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `provider` DROP FOREIGN KEY `Provider_handlerId_fkey`;

-- AlterTable
ALTER TABLE `provider` DROP COLUMN `handlerId`;

-- DropTable
DROP TABLE `handler`;
