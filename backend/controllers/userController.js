import bcrypt from 'bcrypt'
import { models } from '../models/models.js'
import { generateToken } from '../utilities/utilities.js'
import { registerService } from '../services/userService.js'
import { CustomError } from '../errorHandlers/apiErrors.js'

export async function registerUser(req, res, next) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(CustomError.badRequest('Uncorrect email or password!'))
        }

        const userData = await registerService(email, password)

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json(userData)
    } catch (e) {
        console.log(e)
        next(CustomError.badRequest(e.message))
    }
}

export async function loginUser(req, res, next) {
    const { email, password } = req.body

    const user = await models.User.findOne({
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

    const token = generateToken(user.id, user.email, user.role)

    return res.json({
        email,
        role: user.dataValues.role,
        token
    })
}

export async function logoutUser(req, res, next) {}

export async function checkAuth(req, res, next) {
    const { id, email, role } = req.user

    const newToken = generateToken(id, email, role)

    return res.json(newToken)
}

export async function activateAccount(req, res, next) {}

export async function refreshToken(req, res, next) {}

