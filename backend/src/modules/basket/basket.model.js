import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const Basket = db.define('basket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
})

