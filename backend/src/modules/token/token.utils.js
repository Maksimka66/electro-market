import jwt from 'jsonwebtoken'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export function generateTokens(userData) {
    const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_KEY, {
        expiresIn: '3h'
    })
    const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_KEY, {
        expiresIn: '7d'
    })

    return {
        accessToken,
        refreshToken
    }
}

export function validateToken(token, secretKey) {
    const isVerifyed = jwt.verify(token, secretKey)

    if (!isVerifyed) {
        throw CustomError.unauthorized()
    }

    return isVerifyed
}

