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
import { D_ROLE_PERM } from '../utils/defaults'

const roleRouter = express.Router()

roleRouter.get('/', [requirePerm(D_ROLE_PERM.GET_ALL), roleController.getAll])
roleRouter.get('/:id', [requirePerm(D_ROLE_PERM.GET), roleController.getOne])
roleRouter.post('/', [requirePerm(D_ROLE_PERM.CREATE), roleController.createOne])
roleRouter.delete('/:id', [requirePerm(D_ROLE_PERM.DELETE), roleController.deleteOne])
roleRouter.get('/:id/permission', [requirePerm(D_ROLE_PERM.GET_PERMISSIONS), roleController.getPermissions])
roleRouter.post('/:id/permission/:permissionId', [requirePerm(D_ROLE_PERM.CREATE_PERMISSION), roleController.createPermission])
roleRouter.delete('/:id/permission/:permissionId', [requirePerm(D_ROLE_PERM.DELETE_PERMISSION), roleController.deletePermission])

export default roleRouter