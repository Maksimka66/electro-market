import { Router } from 'express'
import {
    activateAccount,
    checkAuth,
    loginUser,
    logoutUser,
    refreshToken,
    registerUser
} from '../controllers/userController.js'
import { authHandler } from '../middleware/authMiddleware.js'

const userRouter = new Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/auth', authHandler, checkAuth)
userRouter.get('/activate/:link', activateAccount)
userRouter.get('/refresh', refreshToken)

export default userRouter

