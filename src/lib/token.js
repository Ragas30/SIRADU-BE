import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '30d'});
}