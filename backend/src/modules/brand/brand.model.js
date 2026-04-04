import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const Brand = data.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

