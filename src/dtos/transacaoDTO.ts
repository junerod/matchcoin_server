import "reflect-metadata";
import { IsString, IsNotEmpty, Matches, IsUUID } from 'class-validator';
import { IsMinValue } from "../utils/isMinValueHelper";
import { IsCPF } from "../utils/isCPF"; 

export class TransacaoDTO {
    @IsUUID("4", { message: "ID deve ser um UUID válido" })
    identificador!: string;

    @IsString()
    @IsNotEmpty({ message: 'O carteira é obrigatório.' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Endereço da carteira inválido.' })
    carteira!: string;

    @IsString()
    @IsCPF({ message: "CPF inválido" })
    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    cpf!: string;

    @IsNotEmpty({ message: 'A quantidade de token é obrigatório.' })
    @IsMinValue('0.000000000000000001', { message: 'A quantidade da transação deve ser no mínimo 0.000000000000000001.' })
    quantidade!: string;

}