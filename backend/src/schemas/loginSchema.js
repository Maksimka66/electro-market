import { body } from 'express-validator'
import { passwordValidationRegex, trimReplace } from './schemaUtils.js'

export const loginSchema = [
    body('email')
        .customSanitizer(trimReplace)
        .notEmpty()
        .withMessage('Email should not be empty')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .customSanitizer(trimReplace)
        .notEmpty()
        .withMessage('Password should not be empty')
        .isLength({
            min: 8,
            max: 30
        })
        .withMessage('Password must be between 8 and 30')
        .custom(async (password) => {
            const checked = passwordValidationRegex.test(password)

            if (!checked) {
                throw new Error(
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                )
            }

            return checked
        })
]

