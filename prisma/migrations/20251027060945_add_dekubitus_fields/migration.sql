/*
  Warnings:

  - Added the required column `dekubitus` to the `PatientHandle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dekubitus` to the `ReposisiHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PatientHandle" ADD COLUMN     "dekubitus" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "public"."ReposisiHistory" ADD COLUMN     "dekubitus" BOOLEAN NOT NULL;
