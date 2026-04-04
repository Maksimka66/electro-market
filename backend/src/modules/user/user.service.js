import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import { Basket } from '../basket/basket.model.js'
import { User } from './user.model.js'

export async function createUserService(email, password) {
    const potentialUser = await User.findOne({
        where: {
            email
        }
    })

    if (potentialUser) {
        throw new Error('There`s already a user with such email!')
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const activationLink = uuidv4()

    const newUser = await User.create({
        email,
        password: hashedPassword,
        activationLink
    })

    await Basket.create({
        userId: newUser.id
    })

    return newUser
}

export async function loginService(email, password) {}

export async function logoutService(email, password) {}

export async function sendActivationEmailService(to, link) {
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

export async function activateAccountService(activationLink) {
    const user = await User.findOne({
        where: {
            activationLink
        }
    })

    if (!user) {
        throw new Error('Uncorrect activation link!')
    }

    user.isActivated = true

    await user.save()
}

