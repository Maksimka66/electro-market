import { generateTokens, validateToken } from './token.utils.js'
import { Token } from './token.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function getToken(searchField, searchData) {
    const tokenData = await Token.findOne({
        where: {
            [searchField]: searchData
        }
    })

    if (!tokenData) {
        throw CustomError.unauthorized()
    }

    return tokenData
}

export async function createTokens(userId, email) {
    const tokens = generateTokens({
        id: userId,
        email
    })

    await Token.create({
        userId,
        refreshToken: tokens.refreshToken
    })

    return tokens
}

export async function updateToken(userId, email) {
    const tokens = generateTokens({
        id: userId,
        email
    })

    await Token.update(
        {
            refreshToken: tokens.refreshToken
        },
        {
            where: {
                userId
            }
        }
    )

    return tokens
}

export async function deleteToken(refreshToken) {
    if (!refreshToken) {
        throw CustomError.unauthorized()
    }

    const tokenData = await Token.destroy({
        where: {
            refreshToken
        }
    })

    return tokenData
}

export async function setRefreshToken(refreshToken) {
    if (!refreshToken) {
        throw CustomError.unauthorized()
    }

    const validatedToken = validateToken(refreshToken, process.env.JWT_REFRESH_KEY)

    return validatedToken
}

