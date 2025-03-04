import "reflect-metadata";
import { IsString, IsNotEmpty, Matches, IsUUID } from 'class-validator';
import { IsMinValue } from "../utils/isMinValueHelper";
import { IsCPF } from "../utils/isCPF"; 

export class ReceberTaxaDTO {
    @IsUUID("4", { message: "ID deve ser um UUID válido" })
    identificador!: string;

    @IsString()
    @IsCPF({ message: "CPF inválido" })
    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    cpf!: string;

    @IsNotEmpty({ message: 'A quantidade de token é obrigatório.' })
    @IsMinValue('0.000000000000000001', { message: 'A quantidade da transação deve ser no mínimo 0.000000000000000001.' })
    quantidade!: string;


    @IsNotEmpty({ message: 'O hash é obrigatório.' })
    @Matches(/^0x[a-fA-F0-9]{64}$/, { message: 'Hash inválido. Deve iniciar com "0x" seguido de 64 caracteres hexadecimais.' })
    hash!: string;

}