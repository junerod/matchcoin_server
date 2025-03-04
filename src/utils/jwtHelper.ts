import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET as string;

export function generateToken(userId: string) {
    console.log(userId, SECRET_KEY);
    return jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: "1h", // Token válido por 1 hora
    });
}
