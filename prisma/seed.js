import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

async function main() {
    const existingUser = await prismaClient.user.findUnique({
        where: { email: 'kepala_perawat@mdjamil.com' },
    })

    const dummyPassword = 'kepala_perawat_picu';
    const hashedPassword = await bcrypt.hash(dummyPassword, 10);

    if (!existingUser) {
        await prismaClient.user.create({
            data: {
                role: 'KEPALA_PERAWAT',
                name: 'Kepala Perawat',
                email: 'kepala_perawat@mdjamil.com',
                password: hashedPassword,
            },
        })

        console.log('✅ Seeder kepala perawat berhasil.')
    } else {
        console.log('ℹ️ User kepala perawat sudah ada.')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })
