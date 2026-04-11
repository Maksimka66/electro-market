import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import { User } from './user.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function createUser(email, password) {
    const potentialUser = await User.findOne({
        where: {
            email
        }
    })

    if (potentialUser) {
        throw CustomError.badRequest('There`s already a user with such email!')
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const activationLink = uuidv4()

    const newUser = await User.create({
        email,
        password: hashedPassword,
        activationLink
    })

    // await Basket.create({
    //     userId: newUser.id
    // })

    return newUser
}

export async function loginUser(email, password) {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        throw CustomError.badRequest('No user with such email!')
    }

    const comparedPasswords = await bcrypt.compare(password, user.password)

    if (!comparedPasswords) {
        throw CustomError.badRequest('Uncorrect password!')
    }

    return user
}

export async function sendActivationEmail(to, link) {
    const emailObj = {
        transporter: nodemailer.createTransport({
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    await emailObj.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Please activate your account on ${process.env.API_URL}`,
        text: '',
        html: `<div>
                    <p>Please follow this link to activate your account:</p>
                    <a href=${link}>${link}</a>
                </div>`
    })
}

export async function activateAccount(activationLink) {
    const user = await User.findOne({
        where: {
            activationLink
        }
    })

    if (!user) {
        throw CustomError.badRequest('Uncorrect activation link!')
    }

    user.isActivated = true

    await user.save()
}

