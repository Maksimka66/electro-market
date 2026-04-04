import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import data from './core/db.js'
import router from './core/routes.js'
import { errorHandler } from './middleware/errorHandlingMiddleware.js'
import { __dirname, __filename } from './configs/config.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(errorHandler)

const port = process.env.SERVER_PORT || 4000

const connectDb = async () => {
    try {
        await data.authenticate()
        await data.sync()

        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

connectDb()

