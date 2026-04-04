import { CustomError } from '../errorHandlers/apiErrors.js'

export function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.status).json({
            message: err.message
        })
    }
    console.log(err)

    return res.status(500).json({
        message: 'Unpredictable error!'
    })
}

