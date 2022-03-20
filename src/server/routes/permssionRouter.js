/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as permissionController from '../controllers/permissionController'
import requirePerm from '../middleware/requirePerm'

const permissionRouter = express.Router()

permissionRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create permission'; return next() }, requirePerm, permissionController.createOne])
permissionRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get permission'; return next() }, requirePerm, permissionController.getOne])
permissionRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get permissions'; return next() }, requirePerm, permissionController.getAll])
permissionRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter permission'; return next() }, requirePerm, permissionController.updateOne])
permissionRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter permission'; return next() }, requirePerm, permissionController.deleteOne])

export default permissionRouter