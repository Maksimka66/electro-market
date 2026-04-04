import { Router } from 'express'
import { createDevice, getAllDevices, getOneDevice } from '../../../controllers/deviceController.js'

const deviceRouter = new Router()

deviceRouter.get('/', getAllDevices)
deviceRouter.get('/:id', getOneDevice)
deviceRouter.post('/', createDevice)

export default deviceRouter

