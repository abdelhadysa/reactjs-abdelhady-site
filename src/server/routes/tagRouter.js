/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as tagController from '../controllers/tagController'
import requirePerm from '../middleware/requirePerm'

const tagRouter = express.Router()

tagRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create tag'; return next() }, requirePerm, tagController.createOne])
tagRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get tag'; return next() }, requirePerm, tagController.getOne])
tagRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get tags'; return next() }, requirePerm, tagController.getAll])
tagRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter tag'; return next() }, requirePerm, tagController.updateOne])
tagRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter tag'; return next() }, requirePerm, tagController.deleteOne])

export default tagRouter