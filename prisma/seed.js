import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

// map bedNumber → roomName
function deriveRoomName(bedNumber) {
  if (typeof bedNumber !== "number" || !Number.isFinite(bedNumber)) return null;
  if (bedNumber >= 513 && bedNumber <= 527) return "seruni";
  if (bedNumber >= 528 && bedNumber <= 537) return "lavender10";
  return null;
}

// Jadwal reposisi berdasar BradenQ (tersedia bila nanti ingin dipakai lagi)
export function hoursForBradenQ(bradenQ) {
  if (bradenQ <= 12) return 2; // High risk
  if (bradenQ <= 14) return 3; // Moderate
  if (bradenQ <= 18) return 4; // Mild
  const fallback = 6;
  const envVal = Number(process.env.REPOSITION_HOURS_NO_RISK || fallback);
  return Number.isFinite(envVal) && envVal > 0 ? envVal : fallback;
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
  const patients = [
    {
      name: "Ahmad Fauzi",
      medicalRecordNumber: "1307011990010001",
      birthDate: new Date("1990-01-10"),
      bedNumber: 513, // seruni
      gender: "LAKI_LAKI",
      bradenQ: 18,
      status: "ACTIVE",
    },
    {
      name: "Siti Aisyah",
      medicalRecordNumber: "1307011992030002",
      birthDate: new Date("1992-03-20"),
      bedNumber: 528, // lavender10
      gender: "PEREMPUAN",
      bradenQ: 16,
      status: "ACTIVE",
    },
    {
      name: "Rangga Saputra",
      medicalRecordNumber: "1307011988120003",
      birthDate: new Date("1988-12-05"),
      bedNumber: 527, // seruni
      gender: "LAKI_LAKI",
      bradenQ: 14,
      status: "NON_ACTIVE",
    },
  ];

  for (const p of patients) {
    const roomName = deriveRoomName(p.bedNumber);
    if (!roomName) throw new Error(`bedNumber ${p.bedNumber} di luar range 513–537`);

    const isActive = p.status === "ACTIVE";
    const exitDate = isActive ? null : new Date();

    await prismaClient.patient.upsert({
      where: { medicalRecordNumber: p.medicalRecordNumber },
      update: {
        name: p.name,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
        exitDate, // set exitDate saat NON_ACTIVE
      },
      create: {
        name: p.name,
        medicalRecordNumber: p.medicalRecordNumber,
        birthDate: p.birthDate,
        bedNumber: p.bedNumber,
        roomName,
        gender: p.gender,
        bradenQ: p.bradenQ,
        status: p.status,
        exitDate,
      },
    });

    console.log(`√ Patient OK: ${p.name} (MRN: ${p.medicalRecordNumber}) → bed ${p.bedNumber} / ${roomName} | status=${p.status}`);
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
