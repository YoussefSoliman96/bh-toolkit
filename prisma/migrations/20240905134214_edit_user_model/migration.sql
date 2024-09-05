/*
  Warnings:

  - You are about to drop the column `userId` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `provider` DROP FOREIGN KEY `Provider_userId_fkey`;

-- AlterTable
ALTER TABLE `provider` DROP COLUMN `userId`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `languages` VARCHAR(191) NOT NULL DEFAULT 'English',
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `languages`,
    ADD COLUMN `language` VARCHAR(191) NOT NULL DEFAULT 'English',
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
