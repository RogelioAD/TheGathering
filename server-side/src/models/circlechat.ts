import { DataTypes, Model, Sequelize } from 'sequelize';
import { Group } from './circlegroup'; 

export class Chat extends Model {
    declare chatId: number;
    declare username: string;
    declare message: string;
    declare groupId: number; 
}

export function ChatFactory(sequelize: Sequelize) {
    Chat.init({
        chatId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Group, 
                key: 'groupId'
            },
            onDelete: "CASCADE"
        }
    }, {
        freezeTableName: true,
        tableName: 'circlechat',
        sequelize,
        timestamps: true
    });
}
