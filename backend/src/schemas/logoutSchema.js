import { cookie } from 'express-validator'

export const logoutSchema = [cookie('refreshToken').isJWT().withMessage('Invalid token')]

