/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as reactionController from '../controllers/reactionController'
import requirePerm from '../middleware/requirePerm'

const reactionRouter = express.Router()

reactionRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create reaction'; return next() }, requirePerm, reactionController.createOne])
reactionRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get reaction'; return next() }, requirePerm, reactionController.getOne])
reactionRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get reactions'; return next() }, requirePerm, reactionController.getAll])
reactionRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter reaction'; return next() }, requirePerm, reactionController.updateOne])
reactionRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter reaction'; return next() }, requirePerm, reactionController.deleteOne])

export default reactionRouter