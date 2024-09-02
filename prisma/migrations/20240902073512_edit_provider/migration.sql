/*
  Warnings:

  - You are about to drop the column `bipolar` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `minors` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `neurode` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `painManagement` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `suboxone` on the `provider` table. All the data in the column will be lost.
  - You are about to drop the column `trauma` on the `provider` table. All the data in the column will be lost.
  - You are about to alter the column `adhd` on the `provider` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `TinyInt`.
  - You are about to alter the column `clozapine` on the `provider` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `TinyInt`.
  - You are about to alter the column `autism` on the `provider` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `TinyInt`.
  - Added the required column `updatedAt` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `provider` DROP COLUMN `bipolar`,
    DROP COLUMN `minors`,
    DROP COLUMN `neurode`,
    DROP COLUMN `painManagement`,
    DROP COLUMN `suboxone`,
    DROP COLUMN `trauma`,
    ADD COLUMN `acceptPainManagementPts` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `minorsAfterSchool` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `neurodegenerativeDisease` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `schizophreniaBipolar` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `suboxoneAddiction` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `traumaticBrainInjury` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `adhd` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `clozapine` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `autism` BOOLEAN NOT NULL DEFAULT false;
