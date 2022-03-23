/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as logController from '../controllers/logController'
import requirePerm from '../middleware/requirePerm'

const logRouter = express.Router()

logRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create log'; return next() }, requirePerm, logController.createOne])
logRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get log'; return next() }, requirePerm, logController.getOne])
logRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get logs'; return next() }, requirePerm, logController.getAll])
logRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter log'; return next() }, requirePerm, logController.updateOne])
logRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter log'; return next() }, requirePerm, logController.deleteOne])

export default logRouter