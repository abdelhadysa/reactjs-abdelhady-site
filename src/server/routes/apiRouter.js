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

const apiRouter = express.Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/message', messageRouter)
apiRouter.use('/role', roleRouter)
apiRouter.use('/permission', permissionRouter)
apiRouter.get('/', apiController)

export default apiRouter