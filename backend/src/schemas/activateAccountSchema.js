import { param } from 'express-validator'

export const activateAccountSchema = [param('link').notEmpty().withMessage('No activation link')]

