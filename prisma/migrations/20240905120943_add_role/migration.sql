/*
  Warnings:

  - Added the required column `role` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `provider` ADD COLUMN `role` ENUM('PSYCHIATRIST', 'THERAPIST', 'RESIDENCY') NOT NULL;
