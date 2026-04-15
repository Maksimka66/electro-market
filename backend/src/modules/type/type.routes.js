import { Router } from 'express'
import { checkRoleHandler } from '../../middlewares/checkRoleMiddleware.js'

const typeRouter = new Router()

typeRouter.get('/', () => {})
typeRouter.post('/', checkRoleHandler('ADMIN'), () => {})

export default typeRouter

