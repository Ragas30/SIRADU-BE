-- 1) Pastikan kolom medicalRecordNumber ada & berisi
DO $$
BEGIN
  -- a) Jika hanya ada "nik", rename ke "medicalRecordNumber"
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='nik'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='medicalRecordNumber'
  ) THEN
    ALTER TABLE "Patient" RENAME COLUMN "nik" TO "medicalRecordNumber";
  END IF;

  -- b) Jika dua-duanya ada (sisa percobaan sebelumnya): salin nilai nik -> medicalRecordNumber lalu drop nik
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='nik'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='medicalRecordNumber'
  ) THEN
    EXECUTE 'UPDATE "Patient" SET "medicalRecordNumber" = "nik" WHERE "medicalRecordNumber" IS NULL AND "nik" IS NOT NULL';
    ALTER TABLE "Patient" DROP COLUMN "nik";
  END IF;

  -- c) Jika keduanya tidak ada (kasus ekstrem), buat kolom medicalRecordNumber (nullable dulu)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='medicalRecordNumber'
  ) THEN
    ALTER TABLE "Patient" ADD COLUMN "medicalRecordNumber" TEXT;
  END IF;
END$$;

-- 2) Tambah kolom roomName (nullable) di 3 tabel bila belum ada
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='Patient' AND column_name='roomName'
  ) THEN
    ALTER TABLE "Patient" ADD COLUMN "roomName" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='ReposisiHistory' AND column_name='roomName'
  ) THEN
    ALTER TABLE "ReposisiHistory" ADD COLUMN "roomName" TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='PatientHandle' AND column_name='roomName'
  ) THEN
    ALTER TABLE "PatientHandle" ADD COLUMN "roomName" TEXT;
  END IF;
END$$;

-- 3) Backfill roomName ke tabel anak dari Patient (jika Patient.roomName sudah terisi)
UPDATE "ReposisiHistory" rh
SET "roomName" = p."roomName"
FROM "Patient" p
WHERE rh."patientId" = p."id"
  AND rh."roomName" IS NULL
  AND p."roomName" IS NOT NULL;

UPDATE "PatientHandle" ph
SET "roomName" = p."roomName"
FROM "Patient" p
WHERE ph."patientId" = p."id"
  AND ph."roomName" IS NULL
  AND p."roomName" IS NOT NULL;

-- 4) Backfill medicalRecordNumber yang NULL / kosong dengan nilai unik
UPDATE "Patient"
SET "medicalRecordNumber" = 'MRN-' || SUBSTRING("id", 1, 12)
WHERE "medicalRecordNumber" IS NULL
   OR LENGTH(TRIM("medicalRecordNumber")) = 0;

-- 5) Pastikan UNIQUE constraint untuk medicalRecordNumber
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Patient_nik_key') THEN
    ALTER TABLE "Patient" RENAME CONSTRAINT "Patient_nik_key" TO "Patient_medicalRecordNumber_key";
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Patient_medicalRecordNumber_key') THEN
    EXECUTE 'ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medicalRecordNumber_key" UNIQUE ("medicalRecordNumber")';
  END IF;
END$$;

-- 6) Baru SET NOT NULL (sekarang aman karena sudah di-backfill)
ALTER TABLE "Patient" ALTER COLUMN "medicalRecordNumber" SET NOT NULL;
