import bcrypt from 'bcrypt'
import { CustomError } from '../errorHandlers/apiErrors.js'
import { models } from '../models/models.js'
import { generateToken } from '../utilities/utilities.js'

export async function registerUser(req, res, next) {
    const { email, password, role } = req.body

    if (!email || !password) {
        return next(CustomError.badRequest('Uncorrect email or password!'))
    }

    const potentialUser = await models.User.findOne({
        where: {
            email
        }
    })

    if (potentialUser) {
        return next(CustomError.badRequest('There`s already a user with such email!'))
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = await models.User.create({
        email,
        role,
        password: hashedPassword
    })

    await models.Basket.create({
        userId: newUser.id
    })

    const token = generateToken(newUser.id, newUser.email, newUser.role)

    return res.status(201).json({
        email,
        role: newUser.dataValues.role,
        token
    })
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

export async function checkAuth(req, res, next) {
    const { id, email, role } = req.user

    const refreshToken = generateToken(id, email, role)

    return res.json(refreshToken)
}

