import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const BasketDevice = data.define('basket_device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

