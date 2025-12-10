-- CreateIndex
CREATE INDEX "idx_patient_status_createdAt" ON "public"."Patient"("status", "createdAt");

-- CreateIndex
CREATE INDEX "idx_patient_createdAt" ON "public"."Patient"("createdAt");

-- CreateIndex
CREATE INDEX "idx_repos_time_id" ON "public"."ReposisiHistory"("Time", "id");
