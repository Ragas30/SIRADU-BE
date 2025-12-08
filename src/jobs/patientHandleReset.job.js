import cron from "node-cron";
import { prismaClient } from "../app/database.js";
import { getTodayJakartaWindow } from "../services/patientHandle.service.js";

/** Set semua handle yang aktif kemarin menjadi NON_ACTIVE */
export async function resetStalePatientHandles(now = new Date()) {
  const { startUTC } = getTodayJakartaWindow(now);
  const result = await prismaClient.patientHandle.updateMany({
    where: {
      status: "ACTIVE",
      updatedAt: { lt: startUTC },
    },
    data: {
      status: "NON_ACTIVE",
    },
  });
  return result.count;
}

/** Jadwalkan reset harian pukul 00:00 WIB dan jalankan sekali saat startup */
export function schedulePatientHandleReset() {
  const task = cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const count = await resetStalePatientHandles();
        console.log(`[cron] Reset patient handles: ${count} baris dinonaktifkan`);
      } catch (err) {
        console.error("[cron] Gagal reset patient handles", err);
      }
    },
    { timezone: "Asia/Jakarta" }
  );

  // Fail-safe: bersihkan data usang jika server sempat down / restart
  resetStalePatientHandles().catch((err) =>
    console.error("[startup] Gagal reset patient handles awal", err)
  );

  return task;
}
