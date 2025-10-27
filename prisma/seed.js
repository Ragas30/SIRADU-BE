import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

// === Helper: map bedNumber → roomName ===
function deriveRoomName(bedNumber) {
  if (typeof bedNumber !== "number" || !Number.isFinite(bedNumber)) return null;
  if (bedNumber >= 513 && bedNumber <= 527) return "seruni";
  if (bedNumber >= 528 && bedNumber <= 537) return "lavender10";
  return null; // out of range (tidak diharapkan)
}

async function pickAnyNurseId() {
  let nurse = await prismaClient.user.findFirst({
    where: {
      role: "PERAWAT",
      nurseDetail: { some: { nurseStatus: "ON_SHIFT" } },
    },
    select: { id: true, email: true, name: true },
  });

  if (!nurse) {
    nurse = await prismaClient.user.findFirst({
      where: { role: "PERAWAT" },
      select: { id: true, email: true, name: true },
    });
  }

  if (!nurse) throw new Error("Tidak ada user PERAWAT untuk dipakai sebagai nurseId.");
  return nurse.id;
}

async function seedHeadNurse() {
  const email = "kepala_perawat@mdjamil.com";
  const rawPassword = "kepala_perawat_picu";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prismaClient.user.upsert({
    where: { email },
    update: {
      name: "Kepala Perawat",
      role: "KEPALA_PERAWAT",
      password: hashedPassword,
    },
    create: {
      name: "Kepala Perawat",
      email,
      role: "KEPALA_PERAWAT",
      password: hashedPassword,
    },
  });

  console.log("√ Seeder Kepala Perawat OK");
}

async function seedNurses() {
  const nurses = [
    {
      name: "Nurse John",
      email: "john.nurse@mdjamil.com",
      rawPassword: "perawat123",
      phone: "081234567890",
      address: "Jl. Merpati No. 1, Padang",
      nurseStatus: "ON_SHIFT",
    },
    {
      name: "Nurse Sarah",
      email: "sarah.nurse@mdjamil.com",
      rawPassword: "perawat123",
      phone: "081298765432",
      address: "Jl. Kenanga No. 5, Padang",
      nurseStatus: "OFF_SHIFT",
    },
    {
      name: "Nurse Budi",
      email: "budi.nurse@mdjamil.com",
      rawPassword: "perawat123",
      phone: "081377712345",
      address: "Jl. Diponegoro No. 21, Padang",
      nurseStatus: "ON_SHIFT",
    },
  ];

  for (const n of nurses) {
    const hashed = await bcrypt.hash(n.rawPassword, 10);

    const user = await prismaClient.user.upsert({
      where: { email: n.email },
      update: { name: n.name, role: "PERAWAT", password: hashed },
      create: { name: n.name, email: n.email, role: "PERAWAT", password: hashed },
      select: { id: true },
    });

    await prismaClient.nurseDetail.upsert({
      where: { userId: user.id },
      update: { phone: n.phone, address: n.address, nurseStatus: n.nurseStatus },
      create: { userId: user.id, phone: n.phone, address: n.address, nurseStatus: n.nurseStatus },
    });

    console.log(`√ Nurse OK: ${n.name} <${n.email}>`);
  }
}

async function seedPatients() {
  // Contoh data pasien disesuaikan dengan range bedNumber 513–537
  const patients = [
    {
      name: "Ahmad Fauzi",
      medicalRecordNumber: "1307011990010001", // 16 digit
      birthDate: new Date("1990-01-10"),
      bedNumber: 513, // → seruni
      gender: "LAKI_LAKI",
      bradenQ: 18,
      status: "ACTIVE",
    },
    {
      name: "Siti Aisyah",
      medicalRecordNumber: "1307011992030002",
      birthDate: new Date("1992-03-20"),
      bedNumber: 528, // → lavender10
      gender: "PEREMPUAN",
      bradenQ: 16,
      status: "ACTIVE",
    },
    {
      name: "Rangga Saputra",
      medicalRecordNumber: "1307011988120003",
      birthDate: new Date("1988-12-05"),
      bedNumber: 527, // → seruni (batas atas)
      gender: "LAKI_LAKI",
      bradenQ: 14,
      status: "NON_ACTIVE",
    },
  ];

  const anyNurseId = await pickAnyNurseId();

  for (const p of patients) {
    const roomName = deriveRoomName(p.bedNumber);
    if (!roomName) {
      throw new Error(`bedNumber ${p.bedNumber} di luar range 513–537`);
    }

    const patient = await prismaClient.patient.upsert({
      where: { medicalRecordNumber: p.medicalRecordNumber },
      update: {
        name: p.name,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName, // set otomatis dari mapping
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
      create: {
        name: p.name,
        medicalRecordNumber: p.medicalRecordNumber,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName, // set otomatis dari mapping
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
      select: { id: true, name: true, bradenQ: true, roomName: true, status: true },
    });

    // PatientHandle (wajib set dekubitus:boolean)
    await prismaClient.patientHandle.upsert({
      where: { patientId_nurseId: { patientId: patient.id, nurseId: anyNurseId } },
      update: {
        bradenQ: patient.bradenQ,
        status: patient.status,
        roomName: patient.roomName ?? null,
        dekubitus: false,
        // nextRepositionTime: null,
      },
      create: {
        patientId: patient.id,
        nurseId: anyNurseId,
        bradenQ: patient.bradenQ,
        status: patient.status,
        roomName: patient.roomName ?? null,
        dekubitus: false,
        // nextRepositionTime: null,
      },
    });

    // ReposisiHistory (wajib set dekubitus:boolean)
    await prismaClient.reposisiHistory.create({
      data: {
        patientId: patient.id,
        nurseId: anyNurseId,
        position: "TERTIDUR SUPINE",
        bradenQ: patient.bradenQ,
        roomName: patient.roomName ?? null,
        dekubitus: false,
        // Time: default NOW()
      },
    });

    console.log(`√ Patient OK: ${p.name} (MRN: ${p.medicalRecordNumber}) → bed ${p.bedNumber} / ${roomName}`);
  }
}

async function main() {
  await seedHeadNurse();
  await seedNurses();
  await seedPatients();
  console.log("=== Seeder selesai. ===");
}

main()
  .catch((e) => {
    console.error("Seeder error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
