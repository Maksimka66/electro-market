import { body } from 'express-validator'
import { passwordValidationRegex, trimReplace } from './schemaUtils.js'

export const registrationSchema = [
    body('username')
        .customSanitizer(trimReplace)
        .notEmpty()
        .withMessage('Username should not be empty')
        .isLength({
            min: 5,
            max: 50
        })
        .withMessage('Username should be between 5 and 50 symbols'),
    body('email')
        .customSanitizer(trimReplace)
        .notEmpty()
        .withMessage('Email should not be empty')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
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
        }),
    body('policy')
        .isBoolean()
        .custom(async (policy) => {
            if (policy !== true) {
                throw new Error('You should agree to our terms and conditions first')
            }
        })
]

