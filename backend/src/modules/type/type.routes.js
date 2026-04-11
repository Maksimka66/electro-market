import { Router } from 'express'
import { createType, getAllTypes } from '../../../controllers/typeController.js'
import { checkRoleHandler } from '../../middlewares/checkRoleMiddleware.js'

const typeRouter = new Router()

typeRouter.get('/', getAllTypes)
typeRouter.post('/', checkRoleHandler('ADMIN'), createType)

export default typeRouter

