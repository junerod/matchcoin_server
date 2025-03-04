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
    carteira_de: string;
    carteira_para: string;
    gas_bnb: string;
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
    public carteira_de!: string;
    public carteira_para!: string;
    public gas_bnb!: string;
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
        },
        carteira_de: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        carteira_para: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        gas_bnb: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "transacao",
        timestamps: false,
    }
);

export default Transacao;
