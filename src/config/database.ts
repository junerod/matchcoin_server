import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: true, // Desativa logs de queries no console
});

// Testar a conexão
sequelize.authenticate()
    .then(() => console.log("Conexão com o MySQL estabelecida!"))
    .catch(err => console.error("Erro ao conectar no MySQL:", err));

export default sequelize;
