import bcrypt from 'bcrypt'
import { generateToken } from '../utilities/utilities.js'
import { registerService } from '../src/modules/user/user.service.js'
import { CustomError } from '../src/errorHandlers/apiErrors.js'
import { User } from '../src/modules/user/user.model.js'

export async function loginUser(req, res, next) {
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

export async function refreshToken(req, res, next) {}
