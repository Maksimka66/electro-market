import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    activationLink: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
})

