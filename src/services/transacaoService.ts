import { TransacaoRepository } from "../repositories/transacaoRepository";

export class TransacaoService {

    constructor(private transacaoRepository: TransacaoRepository) {}

    async salvar(identificador: string, hash: string, cpf:string, quantidade:string, tipo:string, carteira_de:string, carteira_para:string, gas_bnb:string) {
        const transacao = await this.transacaoRepository.salvarTransacao(identificador, hash, cpf, quantidade, tipo, carteira_de, carteira_para, gas_bnb);
        return transacao;
    }

    getAllUsers() {
    }

    getUserById(id: number) {
    }
}
  