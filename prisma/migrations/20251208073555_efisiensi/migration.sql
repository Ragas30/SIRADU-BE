-- CreateIndex
CREATE INDEX "idx_repos_patient_time" ON "public"."ReposisiHistory"("patientId", "Time");

-- CreateIndex
CREATE INDEX "idx_repos_nurse_time" ON "public"."ReposisiHistory"("nurseId", "Time");
