-- AlterTable
ALTER TABLE `provider` ADD COLUMN `handlerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Handler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_handlerId_fkey` FOREIGN KEY (`handlerId`) REFERENCES `Handler`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
