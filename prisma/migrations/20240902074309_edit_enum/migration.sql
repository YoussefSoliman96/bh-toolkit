/*
  Warnings:

  - The values [Male,Female] on the enum `Provider_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `provider` MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL;
