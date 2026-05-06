import { body, param } from 'express-validator'
import { passwordValidationRegex, trimReplace } from './schemaUtils.js'

export const resetPasswordSchema = [
    body('newPassword')
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
    body('confirmNewPassword')
        .notEmpty()
        .withMessage('Confirming of the password should not be empty')
        .isLength({
            min: 8,
            max: 30
        })
        .withMessage('Password must be between 8 and 30')
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.newPassword

            if (password !== confirmPassword) {
                throw new Error('Passwords must be same')
            }
        }),
    param('code').isUUID().withMessage('Invalid reset pasword code')
]

