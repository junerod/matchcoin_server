import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export function validateDTO(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output = plainToInstance(dtoClass, req.body);
        const errors = await validate(output);
        
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }))
            });
        }

        req.body = output;
        next();
    };
}
