import sequelize from "./database";
import User from "../models/user";

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // `force: true` recria tabelas
        console.log("Banco de dados sincronizado com sucesso!");
    } catch (error) {
        console.error("Erro ao sincronizar o banco:", error);
    }
};

syncDatabase();
