import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const User = data.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
    // email: {
    //     type: DataTypes.STRING,
    //     unique: true
    // },
    // password: {
    //     type: DataTypes.STRING
    // },
    // role: {
    //     type: DataTypes.STRING,
    //     defaultValue: 'USER'
    // },
    // isActivated: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false
    // },
    // activationLink: {
    //     type: DataTypes.STRING
    // }
})

