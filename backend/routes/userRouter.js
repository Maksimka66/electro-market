import { Router } from 'express'
import { checkAuth, loginUser, registerUser } from '../controllers/userController.js'
import { authHandler } from '../middleware/authMiddleware.js'

const userRouter = new Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/auth', authHandler, checkAuth)

export default userRouter

