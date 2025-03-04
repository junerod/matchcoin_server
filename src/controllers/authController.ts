import { Request, Response, NextFunction } from "express";
import { verificarBasicHeader }  from "../middlewares/verificarBasicHeader";
import { generateToken } from "../utils/jwtHelper";

const clienteId = process.env.CLIENTID || "minhaChave1";

export class AuthController {
    login = (req: Request, res: Response, next: NextFunction) => {
        verificarBasicHeader(req, res, next);
        let token = generateToken(clienteId);
        return res.json({token});
    };
}
