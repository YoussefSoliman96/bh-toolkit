/*
  Warnings:

  - A unique constraint covering the columns `[handlerId]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `provider` ADD COLUMN `handlerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Handler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Provider_handlerId_key` ON `Provider`(`handlerId`);

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_handlerId_fkey` FOREIGN KEY (`handlerId`) REFERENCES `Handler`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
