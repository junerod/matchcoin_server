import { TransacaoRepository } from "../repositories/transacaoRepository";

export class TransacaoService {

    constructor(private transacaoRepository: TransacaoRepository) {}

    async salvar(identificador: string, hash: string, cpf:string, quantidade:string, tipo:string) {
        const transacao = await this.transacaoRepository.salvarTransacao(identificador, hash, cpf, quantidade, tipo);
        return transacao;
    }

    getAllUsers() {
    }

    getUserById(id: number) {
    }
}
  