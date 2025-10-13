/*
  Warnings:

  - You are about to drop the column `timestamp` on the `ReposisiHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ReposisiHistory" DROP COLUMN "timestamp",
ADD COLUMN     "Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."PatientHandle" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "nurseId" TEXT NOT NULL,
    "bradenQ" INTEGER NOT NULL,
    "foto" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientHandle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientHandle_patientId_nurseId_key" ON "public"."PatientHandle"("patientId", "nurseId");

-- AddForeignKey
ALTER TABLE "public"."PatientHandle" ADD CONSTRAINT "PatientHandle_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PatientHandle" ADD CONSTRAINT "PatientHandle_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
