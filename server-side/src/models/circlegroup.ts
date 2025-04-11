import { DataTypes, Model, Sequelize } from 'sequelize';

export class Group extends Model {
    declare groupId: number;
    declare groupname: string;
}

export function GroupFactory(sequelize: Sequelize) {
    Group.init({
        groupId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        groupname: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'circlegroup',
        sequelize,
        timestamps: true
    });
}
