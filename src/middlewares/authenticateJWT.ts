import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    // O token geralmente vem como "Bearer TOKEN_AQUI"
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Formato do token inválido" });
    }

    jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido ou expirado" });
        }

        (req as AuthenticatedRequest).user = decoded as string | JwtPayload;
        next();
    });
}
