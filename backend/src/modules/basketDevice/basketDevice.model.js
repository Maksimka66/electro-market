import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const BasketDevice = db.define('basket_device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

