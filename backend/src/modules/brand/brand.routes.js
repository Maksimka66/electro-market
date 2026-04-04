import { Router } from 'express'
import { createBrand, getAllBrands } from '../../../controllers/brandController.js'

const brandRouter = new Router()

brandRouter.get('/', getAllBrands)
brandRouter.post('/', createBrand)

export default brandRouter

