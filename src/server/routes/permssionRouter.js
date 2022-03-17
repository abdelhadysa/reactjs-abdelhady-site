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

const permissionRouter = express.Router()

permissionRouter.post('/', permissionController.createOne)
permissionRouter.get('/:id', permissionController.getOne)
permissionRouter.get('/', permissionController.getAll)
permissionRouter.put('/:id', permissionController.updateOne)
permissionRouter.delete('/:id', permissionController.deleteOne)

export default permissionRouter