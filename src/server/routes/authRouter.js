import path from 'path'
import express from 'express'
import * as authController from '../controllers/authController.js'
import requireJWT from '../middleware/requireJWT.js'
import requireNoJWT from '../middleware/requireNoJWT.js'

const authRouter = express.Router()

authRouter.post('/register', [requireNoJWT, authController.register])
authRouter.post('/login', [requireNoJWT, authController.login])
authRouter.post('/logout', [requireJWT, authController.logout])

export default authRouter