import { cookie } from 'express-validator'

export const refreshSchema = [cookie('refreshToken').isJWT().withMessage('Invalid token')]

