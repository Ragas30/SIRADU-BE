/*
  Warnings:

  - You are about to drop the column `pasienId` on the `ReposisiHistory` table. All the data in the column will be lost.
  - You are about to drop the column `perawatId` on the `ReposisiHistory` table. All the data in the column will be lost.
  - You are about to drop the column `posisi` on the `ReposisiHistory` table. All the data in the column will be lost.
  - You are about to drop the column `skinCondition` on the `ReposisiHistory` table. All the data in the column will be lost.
  - You are about to drop the `Pasien` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientCondition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bradenQ` to the `ReposisiHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nurseId` to the `ReposisiHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `ReposisiHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `ReposisiHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."NurseStatus" AS ENUM ('ON_SHIFT', 'OFF_SHIFT');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'NON_ACTIVE');

-- DropForeignKey
ALTER TABLE "public"."PatientCondition" DROP CONSTRAINT "PatientCondition_pasienId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReposisiHistory" DROP CONSTRAINT "ReposisiHistory_pasienId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReposisiHistory" DROP CONSTRAINT "ReposisiHistory_perawatId_fkey";

-- AlterTable
ALTER TABLE "public"."ReposisiHistory" DROP COLUMN "pasienId",
DROP COLUMN "perawatId",
DROP COLUMN "posisi",
DROP COLUMN "skinCondition",
ADD COLUMN     "bradenQ" INTEGER NOT NULL,
ADD COLUMN     "nurseId" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Pasien";

-- DropTable
DROP TABLE "public"."PatientCondition";

-- CreateTable
CREATE TABLE "public"."NurseDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nurseStatus" "public"."NurseStatus" NOT NULL,

    CONSTRAINT "NurseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DailyActivity" (
    "id" TEXT NOT NULL,
    "nurseId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shiftType" TEXT,

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "bedNumber" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "bradenQ" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NurseDetail_userId_key" ON "public"."NurseDetail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyActivity_nurseId_date_key" ON "public"."DailyActivity"("nurseId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_nik_key" ON "public"."Patient"("nik");

-- AddForeignKey
ALTER TABLE "public"."NurseDetail" ADD CONSTRAINT "NurseDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DailyActivity" ADD CONSTRAINT "DailyActivity_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReposisiHistory" ADD CONSTRAINT "ReposisiHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReposisiHistory" ADD CONSTRAINT "ReposisiHistory_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
