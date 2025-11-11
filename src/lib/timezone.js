// src/lib/timezone.js

const JAKARTA_OFFSET_MIN = 7 * 60;
export const JAKARTA_OFFSET_MS = JAKARTA_OFFSET_MIN * 60 * 1000;

/** Konversi komponen tanggal WIB → objek Date UTC */
export function toUtcFromJakarta({ y, m, d, hh, mm = 0, ss = 0 }) {
  const jakartaMs = Date.UTC(y, m - 1, d, hh, mm, ss);
  return new Date(jakartaMs - JAKARTA_OFFSET_MS);
}

/** Format tanggal UTC menjadi ISO string WIB (tanpa sufiks “Z”) */
export function toJakartaISOString(date) {
  if (!date) return null;
  const local = new Date(date.getTime() + JAKARTA_OFFSET_MS);
  return local.toISOString().slice(0, 19);
}
