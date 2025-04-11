import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './circleuser';
import { Group } from './circlegroup';

export class GroupMember extends Model {
    declare id: number;
    declare userId: number;
    declare groupId: number;
}

export function GroupMemberFactory(sequelize: Sequelize) {
    GroupMember.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    }, {
        freezeTableName: true,
        tableName: 'circlegroupmembers',
        sequelize,
        timestamps: true
    });
}
