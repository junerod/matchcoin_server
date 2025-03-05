import Transacao from "../models/transacao";

export class TransacaoRepository {
    async salvarTransacao(identificador: string, hash: string, cpf:string, quantidade:string, tipo:string, carteira_de:string, carteira_para:string, gas_bnb:string) {
        return await Transacao.create({identificador, hash, cpf, quantidade, tipo, carteira_de, carteira_para, gas_bnb});
    }
    async listarTransacoes() {
        return await Transacao.findAll();
    }

}