import "reflect-metadata";
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { IsMinValue } from "../utils/isMinValueHelper";

export class CalcularGasDTO {
    @IsString()
    @IsNotEmpty({ message: 'O carteira é obrigatório.' })
    @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Endereço da carteira inválido.' })
    carteira!: string;

    // @IsNotEmpty({ message: 'O valor do token é obrigatório.' })
    // @IsNumber({}, { message: 'O valor do token deve ser um número.' })
    // @Min(0.000000000000000001, { message: 'O valor da transação deve ser no mínimo 0.000000000000000001.' })
    // valor!: BigNumber;

    @IsNotEmpty({ message: 'A quantidade do token é obrigatório.' })
    @IsMinValue('0.000000000000000001', { message: 'A quantidade da transação deve ser no mínimo 0.000000000000000001.' })
    quantidade!: string;

}