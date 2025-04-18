import { DataTypes, Model, Sequelize } from 'sequelize';
import { Group } from './circlegroup';

export class GroupMember extends Model {
    declare username: string;
    declare groupId: number;
    declare Group?: Group;
}

export function GroupMemberFactory(sequelize: Sequelize) {
    GroupMember.init(
        {
            username: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            groupId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            tableName: 'circlegroupmembers',
            sequelize,
            timestamps: false,
        }
    );
}
