/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as roleController from '../controllers/roleController'
import requirePerm from '../middleware/requirePerm'

const roleRouter = express.Router()

roleRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create role'; return next() }, requirePerm, roleController.createOne])
roleRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get role'; return next() }, requirePerm, roleController.getOne])
roleRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get roles'; return next() }, requirePerm, roleController.getAll])
roleRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter role'; return next() }, requirePerm, roleController.updateOne])
roleRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter role'; return next() }, requirePerm, roleController.deleteOne])

export default roleRouter