import jwt from 'jsonwebtoken'
import { models } from '../models/models.js'

export async function generateTokensService(userData) {
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

export async function saveTokenService(userId, refreshToken) {
    const tokenData = await models.Token.findOne({
        where: {
            userId
        }
    })

    if (tokenData) {
        tokenData.refreshToken = refreshToken

        await tokenData.save()

        return tokenData
    }

    const token = await models.Token.create({
        userId,
        refreshToken
    })

    return token
}

