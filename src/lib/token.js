import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { prismaClient } from "../app/database.js";

const ACCESS_SECRET   = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET  = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES  = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

if (!ACCESS_SECRET)  throw new Error("JWT_ACCESS_SECRET / JWT_SECRET tidak ditemukan di environment");
if (!REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET tidak ditemukan di environment");


function buildRoles(user) {
  const roles = Array.isArray(user.roles)
    ? user.roles.filter(Boolean).map(String)
    : [String(user.role || "PERAWAT")];
  return roles;
}

export function generateAccessToken(user) {
  const roles = buildRoles(user); // ["KEPALA_PERAWAT"] atau ["PERAWAT"], dsb.
  return jwt.sign(
    { id: user.id, email: user.email, roles },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export async function generateAndStoreRefreshToken(user, ttl = REFRESH_EXPIRES) {
  const jti = crypto.randomUUID();
  const rawToken = jwt.sign(
    { id: user.id, jti },
    REFRESH_SECRET,
    { expiresIn: ttl }
  );

  const tokenHash = await bcrypt.hash(rawToken, 10);
  const { exp } = jwt.decode(rawToken); 
  await prismaClient.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(exp * 1000),
    },
  });

  return rawToken;
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export async function rotateRefreshToken(oldToken) {
  const payload = verifyRefreshToken(oldToken); // throw jika invalid/expired
  const userId = payload.id;

  
  const candidates = await prismaClient.refreshToken.findMany({
    where: { userId, revoked: false },
    orderBy: { createdAt: "desc" },
  });

  let matched;
  for (const row of candidates) {
    if (await bcrypt.compare(oldToken, row.tokenHash)) {
      matched = row;
      break;
    }
  }
  if (!matched) {
    const err = new Error("Refresh token not recognized");
    err.status = 401;
    throw err;
  }
  if (matched.expiresAt < new Date()) {
    await prismaClient.refreshToken.update({
      where: { id: matched.id },
      data: { revoked: true },
    });
    const err = new Error("Refresh token expired");
    err.status = 401;
    throw err;
  }

  await prismaClient.refreshToken.update({
    where: { id: matched.id },
    data: { revoked: true },
  });

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
