import { Router } from 'express'
import { header, matchedData, validationResult } from 'express-validator'
import { authHandler } from '../../middlewares/authMiddleware.js'
import {
    activateAccount,
    createUser,
    forgotPassword,
    loginUser,
    resetPassword,
    sendActivationEmail
} from './user.service.js'
import {
    createTokens,
    deleteToken,
    getToken,
    setRefreshToken,
    updateToken
} from '../token/token.service.js'
import { registrationSchema } from '../../schemas/registrationSchema.js'
import { loginSchema } from '../../schemas/loginSchema.js'
import { forgotPasswordSchema } from '../../schemas/forgotPasswordSchema.js'
import { resetPasswordSchema } from '../../schemas/resetPasswordSchema.js'
import { logoutSchema } from '../../schemas/logoutSchema.js'
import { refreshSchema } from '../../schemas/refreshSchema.js'
import { activateAccountSchema } from '../../schemas/activateAccountSchema.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

const userRouter = new Router()

userRouter.post('/register', registrationSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { username, email, password } = matchedData(req)

        const createdUser = await createUser(username, email, password)

        await sendActivationEmail(
            createdUser.email,
            `${process.env.API_URL}/api/user/activate/${createdUser.activationLink}`,
            `Activate your account on ${process.env.API_URL}`,
            'Please follow this link to activate your account:'
        )

        const tokens = await createTokens(createdUser.id, createdUser.email)

        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json({
            ...tokens,
            createdUser
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/login', loginSchema, async (req, res, next) => {
    try {
        const { email, password } = matchedData(req)

        const user = await loginUser(email, password)

        const tokenData = await getToken('userId', user.id)

        if (tokenData) {
            const tokens = await updateToken(user.id, user.email)

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })

            return res.json({
                ...tokens,
                user
            })
        }

        const tokens = await createTokens(user.id, user.email)

        return res.json({
            ...tokens,
            user
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/logout', logoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { refreshToken } = matchedData(req)

        const deletedToken = await deleteToken(refreshToken)

        res.clearCookie('refreshToken')

        return res.json(deletedToken)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/forgot_password', forgotPasswordSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { email } = matchedData(req)

        const changePasswordCode = await forgotPassword(email)

        await sendActivationEmail(
            email,
            `${process.env.API_URL}/api/user/reset_password/${changePasswordCode}`,
            `Reset your password on ${process.env.API_URL}. If you did not do that, ignore this message.`,
            'Please follow this link to reset your password:'
        )

        return res.json({
            message: 'Check your email to continue'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('reset_password/:code', resetPasswordSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { newPassword, code } = matchedData(req)

        await resetPassword(code, newPassword)

        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/auth', [header('Authorization').isJWT()], authHandler, async (req, res, next) => {
    console.log(5)
})

userRouter.get('/activate/:link', activateAccountSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { link } = matchedData(req)
        console.log('Activation: ', 6)

        await activateAccount(link)

        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/refresh', refreshSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { refreshToken } = matchedData(req)

        const tokenData = await getToken('refreshToken', refreshToken)

        const userData = await setRefreshToken(refreshToken)

        if (tokenData && userData) {
            const tokens = await updateToken(userData.id, userData.email)

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })

            return res.json(tokens)
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default userRouter

