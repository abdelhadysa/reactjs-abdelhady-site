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

messageRouter.post('/', messageController.createOne)
messageRouter.get('/:id', messageController.getOne)
messageRouter.get('/', [(req, res, next) => requirePerm(req, res, next, 'Get messages'), messageController.getAll])
messageRouter.put('/:id', messageController.updateOne)
messageRouter.delete('/:id', messageController.deleteOne)

export default messageRouter