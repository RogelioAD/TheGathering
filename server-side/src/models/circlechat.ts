import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./circleuser";
import { Group } from "./circlegroup";

export class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
    declare chatId?: number;
    declare userId: number;
    declare groupId: number;
    declare message: string;
}

export function ChatFactory(sequelize: Sequelize) {
    Chat.init({
        chatId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            },
            onDelete: "CASCADE"
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Group,
                key: "groupId"
            },
            onDelete: "CASCADE"
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'circlechat',
        sequelize,
        timestamps: true
    });
}
