import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/authController";
const router = Router();
const authController = new AuthController();
router.post("/login", (req: Request, res: Response, next: NextFunction) => { authController.login(req, res, next) });
export default router;
