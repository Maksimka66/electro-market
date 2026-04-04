import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const Token = data.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

