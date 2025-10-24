// src/lib/token.js
import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

const ACCESS_SECRET   = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET  = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES  = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET/JWT_SECRET missing");
if (!REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET missing");

const getUserId  = (u) => u?.id ?? u?.userId ?? u?.user?.id ?? u?.sub ?? null;
const buildRoles = (u) => (Array.isArray(u?.roles) ? u.roles.filter(Boolean).map(String) : u?.role ? [String(u.role)] : []);

export function generateAccessToken(user) {
  const id = getUserId(user);
  if (!id) throw new Error("generateAccessToken: user.id undefined");
  const roles = buildRoles(user);
  const email = user?.email ?? user?.user?.email ?? undefined;
  const role  = user?.role ?? roles?.[0] ?? undefined;
  const name  = user?.name ?? user?.user?.name ?? undefined;
  return jwt.sign({ id: String(id), email, role, roles, name }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES, subject: String(id) });
}

export const verifyAccessToken  = (t) => jwt.verify(t, ACCESS_SECRET);
export const verifyRefreshToken = (t) => jwt.verify(t, REFRESH_SECRET);

export async function generateAndStoreRefreshToken(user, ttl = REFRESH_EXPIRES) {
  const id = getUserId(user);
  if (!id) throw new Error("generateAndStoreRefreshToken: user.id undefined");
  const rt = jwt.sign({ id: String(id), type: "refresh" }, REFRESH_SECRET, { expiresIn: ttl });
  const { exp } = jwt.decode(rt);
  await prismaClient.refreshToken.create({ data: { userId: String(id), token: rt, expiresAt: new Date(exp * 1000) } });
  return rt;
}

export async function rotateRefreshToken(oldRt) {
  const p = verifyRefreshToken(oldRt);
  const id = getUserId(p);
  if (!id) { const e = new Error("Refresh token payload invalid"); e.status = 401; throw e; }

  const matched = await prismaClient.refreshToken.findFirst({
    where: { userId: String(id), token: oldRt, revokedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!matched) { const e = new Error("Refresh token not recognized"); e.status = 401; throw e; }
  if (matched.expiresAt < new Date()) {
    await prismaClient.refreshToken.update({ where: { id: matched.id }, data: { revokedAt: new Date() } });
    const e = new Error("Refresh token expired"); e.status = 401; throw e;
  }

  await prismaClient.refreshToken.update({ where: { id: matched.id }, data: { revokedAt: new Date() } });

  const user = await prismaClient.user.findUnique({ where: { id: String(id) }, select: { id: true, email: true, role: true, name: true } });
  const accessToken  = generateAccessToken(user);
  const refreshToken = await generateAndStoreRefreshToken(user);
  return { accessToken, refreshToken };
}

export function shouldSlideRenew(decoded, minLeft = 300) {
  const now = Math.floor(Date.now() / 1000);
  return decoded?.exp - now <= minLeft;
}

export function maxAgeFromExp(token, fallbackMs) {
  try {
    const d = jwt.decode(token);
    const now = Math.floor(Date.now() / 1000);
    const exp = d?.exp ?? now + Math.ceil((fallbackMs ?? 60_000) / 1000);
    return Math.max(0, (exp - now) * 1000);
  } catch { return fallbackMs ?? 60_000; }
}

export const isCrossSiteEnv = () => String(process.env.CROSS_SITE_COOKIES || "false") === "true";

export function buildCookieOptions(req, { crossSite, maxAge }) {
  const isProd = process.env.NODE_ENV === "production";
  const viaProto = req.get?.("x-forwarded-proto")?.includes("https");
  const isHttps = req.secure || viaProto;
  const domain = process.env.COOKIE_DOMAIN || undefined;
  if (crossSite) {
    if (!isHttps) throw new Error("Cross-site cookie needs HTTPS");
    return { httpOnly: true, secure: true, sameSite: "none", path: "/", domain, maxAge };
  }
  return { httpOnly: true, secure: isHttps || isProd, sameSite: "lax", path: "/", domain, maxAge };
}

export function setAccessCookie(req, res, token, opt) {
  const crossSite = opt?.crossSite ?? isCrossSiteEnv();
  res.cookie("at", token, buildCookieOptions(req, { crossSite, maxAge: maxAgeFromExp(token, 15 * 60_000) }));
}

export function setRefreshCookie(req, res, token, opt) {
  const crossSite = opt?.crossSite ?? isCrossSiteEnv();
  res.cookie("rt", token, buildCookieOptions(req, { crossSite, maxAge: maxAgeFromExp(token, 7 * 24 * 60 * 60_000) }));
}

export function clearAuthCookies(req, res, opt) {
  const crossSite = opt?.crossSite ?? isCrossSiteEnv();
  const dummy = buildCookieOptions(req, { crossSite, maxAge: 0 });
  res.clearCookie("at", { ...dummy });
  res.clearCookie("rt", { ...dummy });
}
