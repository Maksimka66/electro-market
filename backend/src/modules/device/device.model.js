import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const Device = db.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

