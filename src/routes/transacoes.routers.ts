import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { TransacoesController } from "../controllers/transacoesController";
import { logger } from "../middlewares/logger"
import { authenticateJWT } from "../middlewares/authenticateJWT"
import { validateDTO } from "../middlewares/validate";
import { TransacaoDTO } from "../dtos/transacaoDTO";
import { ReceberTaxaDTO } from "../dtos/receberTaxaDTO";
import { DepositoDTO } from "../dtos/depositoDTO";
import { CalcularGasDTO } from "../dtos/calcularGasDTO";
import { TransacaoService } from "../services/transacaoService";
import { TransacaoRepository } from "../repositories/transacaoRepository";
const router = Router();
const transacoesController = new TransacoesController(new TransacaoService(new TransacaoRepository()));

/**
 * @openapi
 * /transacoes/identificador:
 *   get:
 *     summary: Cria um identificador para agrupar transações
 *     description: Endpoint que gerar um UUID para inserir nas transações.
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Erro na requisição.
*/
router.get("/transacoes/identificador", [logger], (req: Request, res: Response, next: NextFunction) => { transacoesController.identificador(req, res, next) });


/**
 * @openapi
 * /transacoes/sacar:
 *   post:
 *     summary: Realiza a transferência da carteira do jogo para a carteira do cliente
 *     description: Endpoint que realiza a transferência dos token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carteira:
 *                 type: string
 *                 example: "abe01af13242A"
 *               quantidade:
 *                 type: string
 *                 example: "0.000000000000000001"
 *               cpf:
 *                 type: string
 *                 example: "abe01af13242A"

 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Erro na requisição.
 *       401:
 *         description: Usuário não tem acesso a operação.
 *       403:
 *         description: Token inválido ou expirado.
 */
router.post("/transacoes/sacar", [logger, authenticateJWT, validateDTO(TransacaoDTO)], (req: Request, res: Response, next: NextFunction) => { transacoesController.sacar(req, res, next) });

/**
 * @openapi
 * /transacoes/receber-taxa:
 *   post:
 *     summary: Salva os dados de transferência de valores das taxas.
 *     description: Endpoint para salvar dados das taxas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificador:
 *                 type: string
 *                 example: "ecaf95e0-31d8-4529-9972-d1042d5f8a87"
 *               hash:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *               cpf:
 *                 type: string
 *                 example: "999.999.999-99"
 *               quantidade:
 *                 type: string
 *                 example: "0.000000000000000001"
 *               carteira:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Erro na requisição.
 *       401:
 *         description: Usuário não tem acesso a operação.
 *       403:
 *         description: Token inválido ou expirado.
 */
router.post("/transacoes/receber-taxa", [logger, validateDTO(ReceberTaxaDTO)], (req: Request, res: Response, next: NextFunction) => { transacoesController.receberTaxa(req, res, next) });

/**
 * @openapi
 * /transacoes/deposito:
 *   post:
 *     summary: Salva os dados de transferência de depósito.
 *     description: Endpoint para salvar de depósito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificador:
 *                 type: string
 *                 example: "ecaf95e0-31d8-4529-9972-d1042d5f8a87"
 *               hash:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *               cpf:
 *                 type: string
 *                 example: "999.999.999-99"
 *               quantidade:
 *                 type: string
 *                 example: "0.000000000000000001"
 *               carteira:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Erro na requisição.
 *       401:
 *         description: Usuário não tem acesso a operação.
 *       403:
 *         description: Token inválido ou expirado.
 */
router.post("/transacoes/deposito", [logger, validateDTO(DepositoDTO)], (req: Request, res: Response, next: NextFunction) => { transacoesController.deposito(req, res, next) });

/**
 * @openapi
 * /transacoes/calcular-gas:
 *   post:
 *     summary: Calcula o gas estimado para a transação de saque.
 *     description: Endpoint para calculo estimado de gas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *               quantidade:
 *                 type: string
 *                 example: "10"
 *               carteira:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 *     responses:
 *       200:
 *         description: Operação realizada com sucesso.
 *       400:
 *         description: Erro na requisição.
 *       401:
 *         description: Usuário não tem acesso a operação.
 *       403:
 *         description: Token inválido ou expirado.
 */
router.post("/transacoes/calcular-gas", [logger, validateDTO(CalcularGasDTO)], (req: Request, res: Response, next: NextFunction) => { transacoesController.calcularGas(req, res, next) });

export default router;
