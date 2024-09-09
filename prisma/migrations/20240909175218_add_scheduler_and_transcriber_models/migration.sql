-- AlterTable
ALTER TABLE `provider` ADD COLUMN `schedulerId` INTEGER NULL,
    ADD COLUMN `transcriberId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Scheduler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transcriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_schedulerId_fkey` FOREIGN KEY (`schedulerId`) REFERENCES `Scheduler`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_transcriberId_fkey` FOREIGN KEY (`transcriberId`) REFERENCES `Transcriber`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
