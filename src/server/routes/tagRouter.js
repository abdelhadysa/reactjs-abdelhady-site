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
import { D_TAG_PERM } from '../utils/defaults'

const tagRouter = express.Router()

tagRouter.get('/', [requirePerm(D_TAG_PERM.GET_ALL), tagController.getAll])
tagRouter.get('/:id', [requirePerm(D_TAG_PERM.GET), tagController.getOne])
tagRouter.post('/', [requirePerm(D_TAG_PERM.CREATE), tagController.createOne])
tagRouter.put('/:id', [requirePerm(D_TAG_PERM.UPDATE), tagController.updateOne])
tagRouter.delete('/:id', [requirePerm(D_TAG_PERM.DELETE), tagController.deleteOne])
tagRouter.get('/:id/message', [requirePerm(D_TAG_PERM.GET_MESSAGES), tagController.getMessages])

export default tagRouter