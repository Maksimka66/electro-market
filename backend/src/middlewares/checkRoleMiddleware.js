import { CustomError } from '../errorHandlers/apiErrors.js'
import { validateToken } from '../modules/token/token.utils.js'

export function checkRoleHandler(role) {
    return function (req, res, next) {
        try {
            const authHeader = req.headers.authorization

            const accessToken = authHeader.split(' ')[1]

            if (!authHeader || !accessToken) {
                return next(CustomError.unauthorized())
            }

            const decodedData = validateToken(accessToken, process.env.JWT_ACCESS_KEY)

            if (decodedData.role !== role) {
                return next(CustomError.forbidden('No access!'))
            }

            req.user = decodedData

            next()
        } catch (e) {
            return next(CustomError.unauthorized())
        }
    }
}

