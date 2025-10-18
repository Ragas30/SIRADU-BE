import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

const ACCESS_SECRET   = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET  = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES  = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

function buildRoles(user) {
  const roles = Array.isArray(user.roles)
    ? user.roles.filter(Boolean).map(String)
    : [String(user.role || "PERAWAT")];
  return roles;
}

export function generateAccessToken(user) {
  const roles = buildRoles(user);
  return jwt.sign({ id: user.id, email: user.email, roles }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

// === Opsi B: simpan RAW token, bukan hash ===
export async function generateAndStoreRefreshToken(user, ttl = REFRESH_EXPIRES) {
  if (!user?.user.id) throw new Error("generateAndStoreRefreshToken: user.id undefined");

  const rawToken = jwt.sign({ id: user.user.id }, REFRESH_SECRET, { expiresIn: ttl });
  const { exp } = jwt.decode(rawToken);

  await prismaClient.refreshToken.create({
    data: {
      userId: user.user.id,            // harus terisi
      token: rawToken,            // simpan RAW token (bukan hash)
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
  const userId = payload.id;

  // cari token yang belum dicabut
  const matched = await prismaClient.refreshToken.findFirst({
    where: {
      userId,
      token: oldToken,
      revokedAt: null,            // periksa belum dicabut
    },
    orderBy: { createdAt: "desc" },
  });

  if (!matched) {
    const err = new Error("Refresh token not recognized");
    err.status = 401;
    throw err;
  }
  if (matched.expiresAt < new Date()) {
    await prismaClient.refreshToken.update({
      where: { id: matched.id },
      data: { revokedAt: new Date() },
    });
    const err = new Error("Refresh token expired");
    err.status = 401;
    throw err;
  }

  // cabut yang lama
  await prismaClient.refreshToken.update({
    where: { id: matched.id },
    data: { revokedAt: new Date() },
  });

  // issue baru
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  const accessToken  = generateAccessToken(user);
  const refreshToken = await generateAndStoreRefreshToken(user);

  return { accessToken, refreshToken };
}

export function shouldSlideRenew(decodedAccess, minSecondsLeft = 5 * 60) {
  const now = Math.floor(Date.now() / 1000);
  return (decodedAccess?.exp - now) <= minSecondsLeft;
}
