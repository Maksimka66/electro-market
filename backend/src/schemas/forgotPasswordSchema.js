import { body } from 'express-validator'
import { trimReplace } from './schemaUtils.js'

export const forgotPasswordSchema = [
    body('email')
        .customSanitizer(trimReplace)
        .notEmpty()
        .withMessage('Email should not be empty')
        .isEmail()
        .withMessage('Invalid email')
]

