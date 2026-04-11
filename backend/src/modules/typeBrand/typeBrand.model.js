import { DataTypes } from 'sequelize'
import db from '../../core/db.js'

export const TypeBrand = db.define('type_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

