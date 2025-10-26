import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

// helper ambil satu perawat "aktif" buat pairing awal
async function pickAnyNurseId() {
  const nurse = await prismaClient.user.findFirst({
    where: { role: "PERAWAT" },
    select: { id: true, email: true, name: true },
  });
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

    // User (role PERAWAT)
    const user = await prismaClient.user.upsert({
      where: { email: n.email },
      update: {
        name: n.name,
        role: "PERAWAT",
        password: hashed,
      },
      create: {
        name: n.name,
        email: n.email,
        role: "PERAWAT",
        password: hashed,
      },
      select: { id: true },
    });

    // NurseDetail (userId unik)
    await prismaClient.nurseDetail.upsert({
      where: { userId: user.id },
      update: {
        phone: n.phone,
        address: n.address,
        nurseStatus: n.nurseStatus, // "ON_SHIFT" | "OFF_SHIFT"
      },
      create: {
        userId: user.id,
        phone: n.phone,
        address: n.address,
        nurseStatus: n.nurseStatus,
      },
    });

    console.log(`√ Nurse OK: ${n.name} <${n.email}>`);
  }
}

async function seedPatients() {
  // medicalRecordNumber (dulu nik), plus roomName
  const patients = [
    {
      name: "Ahmad Fauzi",
      medicalRecordNumber: "1307011990010001",
      birthDate: new Date("1990-01-10"),
      bedNumber: 12,
      roomName: "Seruni",
      gender: "LAKI_LAKI",
      bradenQ: 18,
      status: "ACTIVE",
    },
    {
      name: "Siti Aisyah",
      medicalRecordNumber: "1307011992030002",
      birthDate: new Date("1992-03-20"),
      bedNumber: 7,
      roomName: "Lavender 10",
      gender: "PEREMPUAN",
      bradenQ: 16,
      status: "ACTIVE",
    },
    {
      name: "Rangga Saputra",
      medicalRecordNumber: "1307011988120003",
      birthDate: new Date("1988-12-05"),
      bedNumber: 3,
      roomName: "Seruni",
      gender: "LAKI_LAKI",
      bradenQ: 14,
      status: "NON_ACTIVE",
    },
  ];

  const anyNurseId = await pickAnyNurseId();

  for (const p of patients) {
    // upsert Patient by medicalRecordNumber (UNIQUE)
    const patient = await prismaClient.patient.upsert({
      where: { medicalRecordNumber: p.medicalRecordNumber },
      update: {
        name: p.name,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName: p.roomName ?? null,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
      create: {
        name: p.name,
        medicalRecordNumber: p.medicalRecordNumber,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName: p.roomName ?? null,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
      select: { id: true, name: true, bradenQ: true, roomName: true, status: true },
    });

    // PatientHandle (unik: [patientId, nurseId]) — pakai nurse pertama yang ditemukan
    await prismaClient.patientHandle.upsert({
      where: {
        patientId_nurseId: { patientId: patient.id, nurseId: anyNurseId },
      },
      update: {
        bradenQ: patient.bradenQ,
        status: patient.status,
        roomName: patient.roomName ?? null,
      },
      create: {
        patientId: patient.id,
        nurseId: anyNurseId,
        bradenQ: patient.bradenQ,
        status: patient.status,
        roomName: patient.roomName ?? null,
      },
    });

    // ReposisiHistory (tidak unik, tambahkan entri awal)
    await prismaClient.reposisiHistory.create({
      data: {
        patientId: patient.id,
        nurseId: anyNurseId,
        position: "TERTIDUR SUPINE", // contoh posisi awal
        bradenQ: patient.bradenQ,
        roomName: patient.roomName ?? null,
        // Time default now(), foto optional
      },
    });

    console.log(`√ Patient OK: ${p.name} (MRN: ${p.medicalRecordNumber})`);
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
