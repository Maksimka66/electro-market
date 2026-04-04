import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const Rating = data.define('rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
