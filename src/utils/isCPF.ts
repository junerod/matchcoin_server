import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { validate as isValidCPF } from "cpf-check"; // Biblioteca para validar CPF

// Validação de CPF
export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsCPF",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === "string" && isValidCPF(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser um CPF válido`;
                }
            }
        });
    };
}