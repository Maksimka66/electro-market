import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
})

export default db

