import Transacao from "../models/transacao";

export class TransacaoRepository {
    async salvarTransacao(identificador: string, hash: string, cpf:string, quantidade:string, tipo:string) {
        return await Transacao.create({identificador, hash, cpf, quantidade, tipo });
    }
}