import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import data from './db.js'
import router from './routes/index.js'
import { errorHandler } from './middleware/ErrorHandlingMiddleware.js'
import { __dirname, __filename } from './config.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
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

