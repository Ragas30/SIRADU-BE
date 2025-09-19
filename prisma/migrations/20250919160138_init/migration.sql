-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('KEPALA_PERAWAT', 'PERAWAT');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "public"."Resiko" AS ENUM ('TINGGI', 'SEDANG', 'RENDAH', 'SANGAT_TINGGI');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pasien" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "idRuangan" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PatientCondition" (
    "id" TEXT NOT NULL,
    "persepsiSensori" TEXT NOT NULL,
    "kelembapan" TEXT NOT NULL,
    "aktivitas" TEXT NOT NULL,
    "mobilisasi" TEXT NOT NULL,
    "resiko" "public"."Resiko" NOT NULL,
    "pasienId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReposisiHistory" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "perawatId" TEXT NOT NULL,
    "skinCondition" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foto" TEXT,

    CONSTRAINT "ReposisiHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ruangan" (
    "id" TEXT NOT NULL,
    "namaRuangan" TEXT NOT NULL,
    "idPerawat" TEXT NOT NULL,

    CONSTRAINT "Ruangan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_nik_key" ON "public"."Pasien"("nik");

-- AddForeignKey
ALTER TABLE "public"."Pasien" ADD CONSTRAINT "Pasien_idRuangan_fkey" FOREIGN KEY ("idRuangan") REFERENCES "public"."Ruangan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PatientCondition" ADD CONSTRAINT "PatientCondition_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "public"."Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReposisiHistory" ADD CONSTRAINT "ReposisiHistory_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "public"."Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReposisiHistory" ADD CONSTRAINT "ReposisiHistory_perawatId_fkey" FOREIGN KEY ("perawatId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ruangan" ADD CONSTRAINT "Ruangan_idPerawat_fkey" FOREIGN KEY ("idPerawat") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
