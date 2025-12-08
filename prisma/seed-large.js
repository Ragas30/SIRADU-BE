import bcrypt from "bcrypt";
import crypto from "crypto";
import { prismaClient } from "../src/app/database.js";

// Konfigurasi dasar (override via env)
const TOTAL_PATIENTS = Number(process.env.SEED_PATIENTS || 1000000);
const TOTAL_NURSES = Number(process.env.SEED_NURSES || 50);
const BATCH_SIZE = Number(process.env.SEED_BATCH || 20000);
const PASSWORD = process.env.SEED_PASSWORD || "perawat123";
const HISTORY_PER_HANDLE = Number(process.env.SEED_HISTORY_PER_HANDLE || 2);
const PREFIX = process.env.SEED_PREFIX || "seed";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(startYear = 1960, endYear = 2010) {
  const y = rand(startYear, endYear);
  const m = rand(0, 11);
  const d = rand(1, 28);
  return new Date(Date.UTC(y, m, d));
}

async function seedNurses() {
  console.log(`Seeding nurses: ${TOTAL_NURSES}`);
  const hashed = await bcrypt.hash(PASSWORD, 6);
  const nurses = [];
  const nurseDetails = [];
  for (let i = 0; i < TOTAL_NURSES; i++) {
    const id = `${PREFIX}-nurse-${i}`;
    nurses.push({
      id,
      name: `Nurse ${i + 1}`,
      email: `nurse${i + 1}@${PREFIX}.local`,
      password: hashed,
      role: "PERAWAT",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    nurseDetails.push({
      id: `${PREFIX}-nursedetail-${i}`,
      userId: id,
      phone: `08${String(10000000000 + i).slice(0, 10)}`,
      address: `Alamat ${i + 1}`,
      nurseStatus: i % 2 === 0 ? "ON_SHIFT" : "OFF_SHIFT",
    });
  }
  await prismaClient.user.createMany({ data: nurses, skipDuplicates: true });
  await prismaClient.nurseDetail.createMany({ data: nurseDetails, skipDuplicates: true });
  return nurses.map((n) => n.id);
}

function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2;
  if (bradenQ <= 14) return 3;
  if (bradenQ <= 18) return 4;
  return Number(process.env.REPOSITION_HOURS_NO_RISK || 6);
}

function calcNext(bradenQ, base) {
  return new Date(base.getTime() + hoursForBradenQ(bradenQ) * 60 * 60 * 1000);
}

async function seedChunkPatientsHandles(startIdx, count, nurseIds, now) {
  const patients = [];
  const handles = [];
  const histories = [];

  for (let i = 0; i < count; i++) {
    const idx = startIdx + i;
    const pid = `${PREFIX}-patient-${idx}`;
    const bradenQ = rand(10, 20);
    const bedNumber = (idx % 500) + 1;
    const createdAt = new Date(now.getTime() - rand(0, 3) * 24 * 60 * 60 * 1000);
    const nurseId = nurseIds[idx % nurseIds.length];
    const nextRepositionTime = calcNext(bradenQ, createdAt);

    patients.push({
      id: pid,
      name: `Patient ${idx + 1}`,
      medicalRecordNumber: `MRN-${String(idx + 1).padStart(9, "0")}`,
      birthDate: randomDate(),
      bedNumber,
      roomName: `Room-${(bedNumber % 50) + 1}`,
      gender: idx % 2 === 0 ? "LAKI_LAKI" : "PEREMPUAN",
      bradenQ,
      status: idx % 10 === 0 ? "NON_ACTIVE" : "ACTIVE",
      createdAt,
      updatedAt: createdAt,
    });

    handles.push({
      id: `${PREFIX}-handle-${idx}`,
      patientId: pid,
      nurseId,
      bradenQ,
      status: "ACTIVE",
      nextRepositionTime,
      roomName: `Room-${(idx % 50) + 1}`,
      dekubitus: idx % 7 === 0,
      createdAt,
      updatedAt: createdAt,
    });

    for (let h = 0; h < HISTORY_PER_HANDLE; h++) {
      const t = new Date(createdAt.getTime() + rand(30, 180) * 60 * 1000 + h * 30 * 60 * 1000);
      histories.push({
        id: `${PREFIX}-repo-${idx}-${h}-${crypto.randomUUID()}`,
        patientId: pid,
        nurseId,
        position: (idx + h) % 2 === 0 ? "Miring kanan" : "Miring kiri",
        bradenQ,
        Time: t,
        dekubitus: idx % 7 === 0,
        roomName: `Room-${(idx % 50) + 1}`,
        foto: null,
      });
    }
  }

  await prismaClient.patient.createMany({ data: patients, skipDuplicates: true });
  await prismaClient.patientHandle.createMany({ data: handles, skipDuplicates: true });
  await prismaClient.reposisiHistory.createMany({ data: histories, skipDuplicates: true });
}

async function seedMassive() {
  console.log("=== Seed Massive Dataset ===");
  console.log(`Patients target: ${TOTAL_PATIENTS}, Nurses: ${TOTAL_NURSES}, Batch: ${BATCH_SIZE}, History/handle: ${HISTORY_PER_HANDLE}`);

  const nurseIds = await seedNurses();
  const now = new Date();

  for (let start = 0; start < TOTAL_PATIENTS; start += BATCH_SIZE) {
    const remaining = TOTAL_PATIENTS - start;
    const size = Math.min(BATCH_SIZE, remaining);
    console.log(`Batch patients ${start}..${start + size - 1}`);
    await seedChunkPatientsHandles(start, size, nurseIds, now);
  }

  console.log("=== Seed massive selesai ===");
}

seedMassive()
  .catch((e) => {
    console.error("Seed error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
