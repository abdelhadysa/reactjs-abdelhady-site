/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as messageController from '../controllers/messageController'
import requirePerm from '../middleware/requirePerm'

const messageRouter = express.Router()

messageRouter.post('/', [(req, _res, next) => { req.permNeeded = 'Create message'; return next() }, requirePerm, messageController.createOne])
messageRouter.get('/:id', [(req, _res, next) => { req.permNeeded = 'Get message'; return next() }, requirePerm, messageController.getOne])
messageRouter.get('/', [(req, _res, next) => { req.permNeeded = 'Get messages'; return next() }, requirePerm, messageController.getAll])
messageRouter.put('/:id', [(req, _res, next) => { req.permNeeded = 'Alter message'; return next() }, requirePerm, messageController.updateOne])
messageRouter.delete('/:id', [(req, _res, next) => { req.permNeeded = 'Alter message'; return next() }, requirePerm, messageController.deleteOne])

export default messageRouter