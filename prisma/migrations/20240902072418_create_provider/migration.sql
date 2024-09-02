-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` ENUM('NP', 'MD', 'DNP', 'DO') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('Male', 'Female') NOT NULL,
    `evaluation` INTEGER NOT NULL,
    `followUp` INTEGER NOT NULL,
    `languages` VARCHAR(191) NOT NULL DEFAULT 'English',
    `ageRange` INTEGER NOT NULL,
    `workingHours` VARCHAR(191) NOT NULL,
    `suboxone` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `adhd` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `bipolar` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `clozapine` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `autism` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `painManagement` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `trauma` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `neurode` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `minors` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
