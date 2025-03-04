import express from "express";
import cors from 'cors';
import { Express } from "express";
import dotenv from "dotenv";
import router from "./routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Minha API",
            version: "1.0.0",
            description: "Documentação da API utilizando Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/swagger`);
});