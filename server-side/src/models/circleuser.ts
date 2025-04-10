import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
    declare id: number;  // New id field
    declare username: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
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
