import { Router } from 'express'
import userRouter from '../models/user/user.routes.js'
import deviceRouter from '../models/device/device.routes.js'
import typeRouter from '../models/type/type.routes.js'
import brandRouter from '../models/brand/brand.routes.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

export default router

