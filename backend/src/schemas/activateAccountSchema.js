import { param } from 'express-validator'

export const activateAccountSchema = [param('link').isUUID().withMessage('Invalid activation code')]

