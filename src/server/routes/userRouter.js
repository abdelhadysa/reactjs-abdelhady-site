/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as userController from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/', userController.createOne)
userRouter.get('/:id', userController.getOne)
userRouter.get('/', userController.getAll)
userRouter.put('/:id', userController.updateOne)
userRouter.delete('/:id', userController.deleteOne)

export default userRouter