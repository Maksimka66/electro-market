import jwt from 'jsonwebtoken'
import { Token } from './token.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function generateTokens(userData) {
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

export async function saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({
        where: {
            userId
        }
    })

    if (tokenData) {
        tokenData.refreshToken = refreshToken

        await tokenData.save()

        return tokenData
    }

    const token = await Token.create({
        userId,
        refreshToken
    })

    return token
}

export async function deleteToken(refreshToken) {
    if (!refreshToken) {
        throw CustomError.badRequest('No such user, impossible to fulfill this command!')
    }

    const tokenData = await Token.destroy({
        where: {
            refreshToken
        }
    })

    return tokenData
}

