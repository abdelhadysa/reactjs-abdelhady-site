import path from 'path'
import express from 'express'
import * as roleController from '../controllers/roleController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_ROLE_PERM } from '../utils/defaults.js'

const roleRouter = express.Router()

roleRouter.get('/', [requirePerm(D_ROLE_PERM.GET_ALL), roleController.getAll])
roleRouter.get('/:id', [requirePerm(D_ROLE_PERM.GET), roleController.getOne])
roleRouter.post('/', [requirePerm(D_ROLE_PERM.CREATE), roleController.createOne])
roleRouter.delete('/:id', [requirePerm(D_ROLE_PERM.DELETE), roleController.deleteOne])
roleRouter.get('/:id/permission', [requirePerm(D_ROLE_PERM.GET_PERMISSIONS), roleController.getPermissions])
roleRouter.post('/:id/permission/:permissionId', [requirePerm(D_ROLE_PERM.CREATE_PERMISSION), roleController.createPermission])
roleRouter.delete('/:id/permission/:permissionId', [requirePerm(D_ROLE_PERM.DELETE_PERMISSION), roleController.deletePermission])

export default roleRouter