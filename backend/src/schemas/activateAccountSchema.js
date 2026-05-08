import { query } from 'express-validator'

export const activateAccountSchema = [query('code').isUUID().withMessage('Invalid activation code')]

