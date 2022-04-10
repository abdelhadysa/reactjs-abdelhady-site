import path from 'path'
import express from 'express'
import apiController from '../controllers/apiController.js'
import userRouter from './userRouter.js'
import messageRouter from './messageRouter.js'
import roleRouter from './roleRouter.js'
import permissionRouter from './permssionRouter.js'
import logRouter from './logRouter.js'
import tagRouter from './tagRouter.js'
import attachmentRouter from './attachmentRouter.js'
import authRouter from './authRouter.js'
import reactionRouter from './reactionRouter.js'
import refreshJWT from '../middleware/refreshJWT.js'
import requireJWT from '../middleware/requireJWT.js'

const apiRouter = express.Router()

apiRouter.use(refreshJWT)
apiRouter.use('/user', [requireJWT, userRouter])
apiRouter.use('/message', [requireJWT, messageRouter])
apiRouter.use('/role', [requireJWT, roleRouter])
apiRouter.use('/permission', [requireJWT, permissionRouter])
apiRouter.use('/auth', authRouter)
apiRouter.use('/reaction', [requireJWT, reactionRouter])
apiRouter.use('/log', [requireJWT, logRouter])
apiRouter.use('/tag', [requireJWT, tagRouter])
apiRouter.use('/attachment', [requireJWT, attachmentRouter])
apiRouter.get('/', apiController)

export default apiRouter