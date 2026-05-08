import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import { User } from './user.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function createUser(username, email, password) {
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
        username,
        email,
        password: hashedPassword,
        activationLink
    })

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

export async function sendActivationEmail(to, link, subject, text) {
    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        secure: false
    })

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: `<div>
                    <p>${text}</p>
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
    user.activationLink = ''

    await user.save()
}

export async function forgotPassword(email) {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        throw CustomError.badRequest('No user with such email!')
    }

    const changePasswordCode = uuidv4()

    user.changePasswordCode = changePasswordCode

    await user.save()

    return changePasswordCode
}

export async function resetPassword(changePasswordCode, newPassword) {
    const user = await User.findOne({
        where: {
            changePasswordCode
        }
    })

    if (!user) {
        throw CustomError.badRequest('No such user!')
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 5)

    user.password = hashedNewPassword
    user.changePasswordCode = ''

    await user.save()
}

