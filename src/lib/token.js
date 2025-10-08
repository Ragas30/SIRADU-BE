import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET tidak ditemukan di environment");

  return jwt.sign({ id: user.id }, secret, { expiresIn: "30d" });
};
