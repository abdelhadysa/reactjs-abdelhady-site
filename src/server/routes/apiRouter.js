/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import apiController from '../controllers/apiController'
import userRouter from './userRouter'
import messageRouter from './messageRouter'
import roleRouter from './roleRouter'
import permissionRouter from './permssionRouter'
import logRouter from './logRouter'
import tagRouter from './tagRouter'
import attachmentRouter from './attachmentRouter'
import authRouter from './authRouter'
import reactionRouter from './reactionRouter'
import refreshJWT from '../middleware/refreshJWT'
import requireJWT from '../middleware/requireJWT'

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