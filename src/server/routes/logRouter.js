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
import { D_LOG_PERM } from '../utils/defaults'

const logRouter = express.Router()

logRouter.get('/', [requirePerm(D_LOG_PERM.GET_ALL), logController.getAll])
logRouter.get('/:id', [requirePerm(D_LOG_PERM.GET), logController.getOne])
logRouter.post('/', [requirePerm(D_LOG_PERM.CREATE), logController.createOne])
logRouter.put('/:id', [requirePerm(D_LOG_PERM.UPDATE), logController.updateOne])
logRouter.delete('/:id', [requirePerm(D_LOG_PERM.DELETE), logController.deleteOne])

export default logRouter