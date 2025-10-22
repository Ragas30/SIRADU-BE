-- AlterTable
ALTER TABLE "public"."PatientHandle" ADD COLUMN     "nextRepositionTime" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "idx_next_repos_time_status" ON "public"."PatientHandle"("nextRepositionTime", "status");
