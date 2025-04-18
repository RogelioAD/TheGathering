import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Group } from './circlegroup';

export class User extends Model {
    declare username: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare Groups?: Group[];

    static associations: {
        Groups: Association<User, Group>;
    };
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'circleuser',
        sequelize,
        timestamps: true
    });
}
