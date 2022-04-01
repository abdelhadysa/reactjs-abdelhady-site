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
import { D_PERMISSION_PERM } from '../utils/defaults'

const permissionRouter = express.Router()

permissionRouter.get('/', [requirePerm(D_PERMISSION_PERM.GET_ALL), permissionController.getAll])
permissionRouter.get('/:id', [requirePerm(D_PERMISSION_PERM.GET), permissionController.getOne])
permissionRouter.post('/', [requirePerm(D_PERMISSION_PERM.CREATE), permissionController.createOne])
permissionRouter.put('/:id', [requirePerm(D_PERMISSION_PERM.UPDATE), permissionController.updateOne])
permissionRouter.delete('/:id', [requirePerm(D_PERMISSION_PERM.DELETE), permissionController.deleteOne])
permissionRouter.get('/:id/role', [requirePerm(D_PERMISSION_PERM.GET_ROLES), permissionController.getRoles])

export default permissionRouter