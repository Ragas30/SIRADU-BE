import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

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

  console.log(" Seeder kepala perawat OK");
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
      select: { id: true, email: true },
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

    console.log(` Nurse OK: ${n.name} <${n.email}>`);
  }
}

async function seedPatients() {
  const patients = [
    {
      name: "Ahmad Fauzi",
      nik: "1307011990010001",
      birthDate: new Date("1990-01-10"),
      bedNumber: 12,
      gender: "LAKI_LAKI",
      bradenQ: 18,
      status: "ACTIVE",
    },
    {
      name: "Siti Aisyah",
      nik: "1307011992030002",
      birthDate: new Date("1992-03-20"),
      bedNumber: 7,
      gender: "PEREMPUAN",
      bradenQ: 16,
      status: "ACTIVE",
    },
    {
      name: "Rangga Saputra",
      nik: "1307011988120003",
      birthDate: new Date("1988-12-05"),
      bedNumber: 3,
      gender: "LAKI_LAKI",
      bradenQ: 14,
      status: "NON_ACTIVE",
    },
  ];

  for (const p of patients) {
    await prismaClient.patient.upsert({
      where: { nik: p.nik }, // nik unik
      update: {
        name: p.name,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
      create: {
        name: p.name,
        nik: p.nik,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
      },
    });

    console.log(` Patient OK: ${p.name} (NIK: ${p.nik})`);
  }
}

async function main() {
  await seedHeadNurse();
  await seedNurses();
  await seedPatients();
  console.log("Seeder selesai.");
}

main()
  .catch((e) => {
    console.error("Seeder error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
