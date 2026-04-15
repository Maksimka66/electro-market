import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const Token = db.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

