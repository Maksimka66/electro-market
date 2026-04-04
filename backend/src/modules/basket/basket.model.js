import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const Basket = data.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

