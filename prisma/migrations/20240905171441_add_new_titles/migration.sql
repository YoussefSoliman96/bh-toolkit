-- AlterTable
ALTER TABLE `provider` MODIFY `title` ENUM('NP', 'MD', 'DNP', 'DO', 'AMFT', 'APCC', 'LCSW', 'PhD', 'PsyD') NOT NULL,
    MODIFY `workingHours` VARCHAR(191) NOT NULL DEFAULT '';
