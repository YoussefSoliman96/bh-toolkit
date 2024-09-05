/*
  Warnings:

  - You are about to drop the column `firstName` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `provider` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `provider` DROP COLUMN `firstName`,
    DROP COLUMN `gender`,
    DROP COLUMN `languages`,
    DROP COLUMN `lastName`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `languages` VARCHAR(191) NOT NULL DEFAULT 'English',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
