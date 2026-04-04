import { Router } from 'express'
import { body, query, matchedData } from 'express-validator'
import bcrypt from 'bcrypt'
import { authHandler } from '../../middleware/authMiddleware.js'
import {
    activateAccountService,
    createUserService,
    sendActivationEmailService
} from './user.service.js'
import { User } from './user.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'
import { generateTokensService, saveTokenService } from '../token/token.service.js'
import { validate } from '../../utils/validation.utils.js'

const userRouter = new Router()

userRouter.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        query('test').isLength({ min: 8 })
    ],
    validate,
    async (req, res, next) => {
        try {
            console.log(matchedData(req))
            const { email, password, ...rest } = matchedData(req)

            const createdUser = await createUserService(email, password)

            await sendActivationEmailService(
                createdUser.email,
                `${process.env.API_URL}/api/user/activate/${createdUser.activationLink}`
            )

            const tokens = await generateTokensService({
                id: createdUser.id,
                email: createdUser.email,
                isActivated: createdUser.isActivated
            })

            await saveTokenService(createdUser.id, tokens.refreshToken)

            return res.status(201).json(createdUser)
        } catch (e) {
            console.log(e)
            next(CustomError.badRequest(e.message))
        }
    }
)

userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            return next(CustomError.badRequest('No user with such email!'))
        }

        const comparedPasswords = bcrypt.compareSync(password, user.password)

        if (!comparedPasswords) {
            return next(CustomError.badRequest('Wrong password!'))
        }

        console.log(user)

        const token = generateTokensService(user)

        return res.json({
            email,
            role: user.dataValues.role,
            token
        })
    } catch (e) {
        console.log(e)
        next(CustomError.badRequest(e.message))
    }
})

userRouter.post('/logout', async (req, res, next) => {})

userRouter.get('/auth', authHandler, async (req, res, next) => {})

userRouter.get('/activate/:link', async (req, res, next) => {
    try {
        const activationLink = req.params.link

        await activateAccountService(activationLink)

        return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
        console.log(e)
        next(CustomError.badRequest(e.message))
    }
})

userRouter.get('/refresh', async (req, res, next) => {})

export default userRouter

