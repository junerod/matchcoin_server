import Web3 from 'web3';
import { Request, Response, NextFunction } from "express";
import { verificarBasicHeader }  from "../middlewares/verificarBasicHeader";
import { generateToken } from "../utils/jwtHelper";
import { TransacaoService } from '../services/transacaoService';
import BigNumber from 'bignumber.js';
import { readFileSync } from 'fs';
import { ethers, uuidV4 } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";

dotenv.config();

const clienteId = process.env.CLIENTID || "minhaChave1";

const provider = process.env.BSCSCAN || "https://data-seed-prebsc-1-s1.binance.org:8545/";

export class TransacoesController {
    private web3: Web3;

    private contract:string;
    private wallet:string;
    private privateKey:string;
    private decimal:string;
    private abi:string;

    constructor(private transacaoService: TransacaoService) {
        this.web3 = new Web3(provider);
        this.contract = process.env.CONTRACT || "";
        this.wallet = process.env.WALLET || "";
        this.privateKey = process.env.PRIVATE_KEY || "";
        this.decimal = process.env.DECIMAL || "";
        this.abi = process.env.ABI || "";
    }
    
    getError = (chave:string, mensagem:string) => {
        return {
            "message": "Erro de configuração",
            "errors": [
                {
                    "property": `${chave}`,
                    "constraints": {
                        "chave": `${mensagem}`
                    }
                }
            ]
        }
    }

    identificador = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const identificador = uuidv4();
            return res.status(201).json({identificador});    
        } catch (error) {
            return res.status(400).json({error});    
        }
    }

    deposito = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { identificador, hash, cpf, quantidade, carteira } = req.body;
            const transacao = await this.transacaoService.salvar(identificador, hash, cpf, quantidade, "DEPOSITO", carteira, this.wallet, "");
            return res.status(201).json({transacao});    
        } catch (error) {
            return res.status(400).json({error});    
        }
    }

    calcularGas = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { carteira, quantidade } = req.body;

            if (this.privateKey.trim() == "") {
                let erro = this.getError("privateKey", "Private Key não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.wallet.trim() == "") {
                let erro = this.getError("wallet", "Carteira não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.decimal.trim() == "") {
                let erro = this.getError("decimal", "Decimal não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.abi.trim() == "") {
                let erro = this.getError("abi", "ABI não setada na aplicação");
                res.status(500).json(erro);
            }

            const decimal = parseInt(this.decimal);
            if (decimal <= 0) {
                let erro = this.getError("decimal", "Decimal não pode menor ou igual a 0");
                res.status(500).json(erro);
            }

            const pathAbi:string = `./data/abi/${this.abi}`;
            const contractABI = JSON.parse(readFileSync(pathAbi, 'utf-8'));

            const amount = ethers.parseUnits(quantidade, decimal); // Assumindo 18 casas decimais
            const _provider = new ethers.JsonRpcProvider(provider);
            const wallet = new ethers.Wallet(this.privateKey, _provider);
            const contract = new ethers.Contract(this.contract, contractABI, wallet);

            console.log("Estimando Gas Fee...");
        
            // Estimar Gas
            const gasEstimate = await contract.transfer.estimateGas(carteira, amount);
        
            // Obter o preço do gás
            const gasPrice = await _provider.getFeeData();
            
            // Calcular custo total da transação em BNB
            const gasFeeBNB = ethers.formatUnits(gasEstimate * gasPrice.gasPrice!, "ether");
        
            // console.log(`Gas Estimado: ${gasEstimate.toString()} unidades`);
            // console.log(`Custo Total: ${gasFeeBNB} BNB`);
        
            return res.status(201).json({
                unidadeGasEstimado: gasEstimate.toString(),
                custoTotalBnb: gasFeeBNB 
            });    
        } catch (error) {
            console.log("error", error);
            return res.status(400).json({error});    
        }
    }

    receberTaxa = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { identificador, hash, cpf, quantidade, carteira, gas_bnb } = req.body;
            console.log("identificador", identificador);
            const transacao = await this.transacaoService.salvar(identificador, hash, cpf, quantidade, "TAXA", carteira, this.wallet, gas_bnb);
            return res.status(201).json({transacao});    
        } catch (error) {
            return res.status(400).json({error});    
        }
    }

    sacar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { identificador, cpf, quantidade, carteira } = req.body;

            if (this.privateKey.trim() == "") {
                let erro = this.getError("privateKey", "Private Key não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.wallet.trim() == "") {
                let erro = this.getError("wallet", "Carteira não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.decimal.trim() == "") {
                let erro = this.getError("decimal", "Decimal não setada na aplicação");
                res.status(500).json(erro);
            }

            if (this.abi.trim() == "") {
                let erro = this.getError("abi", "ABI não setada na aplicação");
                res.status(500).json(erro);
            }

            const decimal = parseInt(this.decimal);
            if (decimal <= 0) {
                let erro = this.getError("decimal", "Decimal não pode menor ou igual a 0");
                res.status(500).json(erro);
            }

            const pathAbi:string = `./data/abi/${this.abi}`;
            const contractABI = JSON.parse(readFileSync(pathAbi, 'utf-8'));


            const _provider = new ethers.JsonRpcProvider(provider);
            const wallet = new ethers.Wallet(this.privateKey, _provider);
            const contract = new ethers.Contract(this.contract, contractABI, wallet);

            const amount = ethers.parseUnits(quantidade, decimal);
            console.log(`🔄 Iniciando transferência de ${ethers.formatUnits(amount, decimal)} tokens...`);

            // Enviar transação
            const tx = await contract.transfer(carteira, amount);
            await tx.wait();
            const hash = tx.hash;
            console.log("📤 Transação enviada. Hash:", hash);
            const transacao = await this.transacaoService.salvar(identificador, hash, cpf, quantidade, "SAQUE", this.wallet, carteira, "");
            return res.status(201).json({transacao});    
        } catch (error) {
            console.log("error", error);
            return res.status(400).json({error});    
        }
    }
}
