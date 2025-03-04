import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define os atributos do modelo
interface TransacaoAttributes {
    id: string;
    identificador: string;
    hash: string;
    cpf: string;
    quantidade: string;
    tipo: string;
}

// Define quais campos são opcionais ao criar um novo usuário
interface TransacaoCreationAttributes extends Optional<TransacaoAttributes, "id"> {}

class Transacao extends Model<TransacaoAttributes, TransacaoCreationAttributes> {
    public id!: string;  // Agora UUID será gerado automaticamente
    public identificador!: string;
    public hash!: string;
    public cpf!: string;
    public quantidade!: string;
    public tipo!: string;
}

Transacao.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Gera um UUID automaticamente
            primaryKey: true,
        },
        identificador: {
            type: DataTypes.STRING(36),
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "transacao",
        timestamps: false,
    }
);

export default Transacao;
