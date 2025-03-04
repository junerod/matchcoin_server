import { Router } from "express";
import authRoutes from "./auth.routers";
import transacoesRouters from "./transacoes.routers";
const router = Router();
router.use(authRoutes, transacoesRouters);
export default router;
