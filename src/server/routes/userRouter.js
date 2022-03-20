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
import requirePerm from '../middleware/requirePerm'

const userRouter = express.Router()

userRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create user'; return next() }, requirePerm, userController.createOne])
userRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get user'; return next() }, requirePerm, userController.getOne])
userRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get users'; return next() }, requirePerm, userController.getAll])
userRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter user'; return next() }, requirePerm, userController.updateOne])
userRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter user'; return next() }, requirePerm, userController.deleteOne])
userRouter.put('/role/:id', [(req, _res, next) => { req.permNeeded = 'Alter user'; return next() }, requirePerm, userController.toggleRole])

export default userRouter