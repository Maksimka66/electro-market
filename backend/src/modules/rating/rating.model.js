import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const Rating = db.define('rating', {
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

