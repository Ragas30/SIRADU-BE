import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET tidak ditemukan di environment");

  const roles = Array.isArray(user.roles) ? user.roles.filter(Boolean).map(String) : [String(user.role || "PERAWAT")];

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles,
    },
    secret,
    { expiresIn: "12h" }
  );
};
