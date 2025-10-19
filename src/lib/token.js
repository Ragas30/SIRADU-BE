import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET / JWT_SECRET tidak ditemukan di environment");
if (!REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET tidak ditemukan di environment");

function getUserId(u) {
  return u?.id ?? u?.userId ?? u?.user?.id ?? u?.sub ?? null;
}

function buildRoles(user) {
  // roles bisa array (["KEPALA_PERAWAT"]) atau single string (role)
  const roles = Array.isArray(user?.roles) ? user.roles.filter(Boolean).map(String) : [String(user?.role || "PERAWAT")];
  return roles;
}

export function generateAccessToken(user) {
  const userId = getUserId(user);
  if (!userId) throw new Error("generateAccessToken: user.id undefined");

  const roles = buildRoles(user);
  const email = user?.email ?? user?.user?.email ?? undefined;

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles,
    },
    ACCESS_SECRET,
    {
      expiresIn: ACCESS_EXPIRES,
      subject: String(userId), // opsional: isi juga sub, untuk interoperabilitas
    }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

// Simpan RAW refresh token (pastikan tabel/kolom aman, enkripsi di DB bila perlu)
export async function generateAndStoreRefreshToken(user, ttl = REFRESH_EXPIRES) {
  const userId = getUserId(user);
  if (!userId) throw new Error("generateAndStoreRefreshToken: user.id undefined");

  const rawToken = jwt.sign({ id: userId, type: "refresh" }, REFRESH_SECRET, { expiresIn: ttl });
  const { exp } = jwt.decode(rawToken);

  await prismaClient.refreshToken.create({
    data: {
      userId,
      token: rawToken,
      expiresAt: new Date(exp * 1000),
    },
  });

  return rawToken;
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export async function rotateRefreshToken(oldToken) {
  const payload = verifyRefreshToken(oldToken);
  const userId = getUserId(payload);
  if (!userId) {
    const err = new Error("Refresh token payload invalid");
    err.status = 401;
    throw err;
  }

  // validasi token tersimpan & belum dicabut
  const matched = await prismaClient.refreshToken.findFirst({
    where: { userId, token: oldToken, revokedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!matched) {
    const err = new Error("Refresh token not recognized");
    err.status = 401;
    throw err;
  }

  // expired?
  if (matched.expiresAt < new Date()) {
    await prismaClient.refreshToken.update({
      where: { id: matched.id },
      data: { revokedAt: new Date() },
    });
    const err = new Error("Refresh token expired");
    err.status = 401;
    throw err;
  }

  // revoke yang lama
  await prismaClient.refreshToken.update({
    where: { id: matched.id },
    data: { revokedAt: new Date() },
  });

  // ambil user minimal field untuk sign token baru
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateAndStoreRefreshToken(user);

  return { accessToken, refreshToken };
}

export function shouldSlideRenew(decodedAccess, minSecondsLeft = 5 * 60) {
  const now = Math.floor(Date.now() / 1000);
  return decodedAccess?.exp - now <= minSecondsLeft;
}
