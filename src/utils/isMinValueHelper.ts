import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import BigNumber from 'bignumber.js';

export function IsMinValue(minValue: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isMinValue',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [minValue],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [min] = args.constraints;
                    if (typeof value !== 'string') return false;
                        const bnValue = new BigNumber(value);
                        const bnMin = new BigNumber(min);
                        return bnValue.isGreaterThanOrEqualTo(bnMin);
                },
                defaultMessage(args: ValidationArguments) {
                    const [min] = args.constraints;
                    return `O valor deve ser maior ou igual a ${min}.`;
                },
            },
        });
    };
}