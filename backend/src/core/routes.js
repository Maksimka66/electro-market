import { Router } from 'express'
import userRouter from '../modules/user/user.routes.js'
import deviceRouter from '../modules/device/device.routes.js'
import typeRouter from '../modules/type/type.routes.js'
import brandRouter from '../modules/brand/brand.routes.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

export default router

