import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const authRoutes = Router()

authRoutes.post('/register', authMiddleware, AuthController.store) //apenas adm cadastra users
authRoutes.post('/login', AuthController.login)

export default authRoutes