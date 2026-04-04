import { DataTypes } from 'sequelize'
import data from '../../core/db.js'

export const TypeBrand = data.define('type_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
