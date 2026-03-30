import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { models } from '../models/models.js'
import { sendActivationEmailService } from './mailService.js'
import { generateTokensService, saveTokenService } from './tokenService.js'
import { UserDto } from '../dtos/userDto.js'

export async function registerService(email, password) {
    const potentialUser = await models.User.findOne({
        where: {
            email
        }
    })

    if (potentialUser) {
        throw new Error('There`s already a user with such email!')
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const activationLink = uuidv4()

    const newUser = await models.User.create({
        email,
        password: hashedPassword,
        activationLink
    })

    await sendActivationEmailService(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(newUser)

    await models.Basket.create({
        userId: userDto.id
    })

    const tokens = await generateTokensService({
        id: userDto.id,
        role: userDto.role,
        email
    })

    await saveTokenService(userDto.id, tokens.refreshToken)

    return {
        ...tokens,
        user: userDto
    }
}

export async function loginService(email, password) {}

export async function logoutService(email, password) {}

