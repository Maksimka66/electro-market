import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { authHandler } from '../../middlewares/authMiddleware.js'
import { activateAccount, createUser, loginUser, sendActivationEmail } from './user.service.js'
import { deleteToken, generateTokens, saveToken } from '../token/token.service.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

const userRouter = new Router()

userRouter.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({
            min: 6,
            max: 30
        })
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(CustomError.badRequest('Validation error!', errors.array()))
            }

            const { email, password } = req.body

            const createdUser = await createUser(email, password)

            // await sendActivationEmail(
            //     createdUser.email,
            //     `${process.env.API_URL}/api/user/activate/${createdUser.activationLink}`
            // )

            const tokens = await generateTokens({
                id: createdUser.id,
                email: createdUser.email
            })

            const { refreshToken } = await saveToken(createdUser.id, tokens.refreshToken)

            res.cookie('refreshToken', refreshToken, {
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
    }
)

userRouter.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').isLength({
            min: 6,
            max: 30
        })
    ],
    async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await loginUser(email, password)

            const tokens = await generateTokens({
                id: user.id,
                email: user.email
            })

            await saveToken(user.id, tokens.refreshToken)

            return res.json({
                ...tokens,
                user
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
)

userRouter.post('/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies

        const deletedToken = await deleteToken(refreshToken)

        res.clearCookie('refreshToken')

        return res.json(deletedToken)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/auth', authHandler, async (req, res, next) => {})

userRouter.get('/activate/:link', async (req, res, next) => {
    try {
        const activationLink = req.params.link

        await activateAccount(activationLink)

        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/refresh', async (req, res, next) => {})

export default userRouter

