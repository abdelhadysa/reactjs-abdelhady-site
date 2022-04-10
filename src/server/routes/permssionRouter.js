import path from 'path'
import express from 'express'
import * as permissionController from '../controllers/permissionController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_PERMISSION_PERM } from '../utils/defaults.js'

const permissionRouter = express.Router()

permissionRouter.get('/', [requirePerm(D_PERMISSION_PERM.GET_ALL), permissionController.getAll])
permissionRouter.get('/:id', [requirePerm(D_PERMISSION_PERM.GET), permissionController.getOne])
permissionRouter.post('/', [requirePerm(D_PERMISSION_PERM.CREATE), permissionController.createOne])
permissionRouter.put('/:id', [requirePerm(D_PERMISSION_PERM.UPDATE), permissionController.updateOne])
permissionRouter.delete('/:id', [requirePerm(D_PERMISSION_PERM.DELETE), permissionController.deleteOne])
permissionRouter.get('/:id/role', [requirePerm(D_PERMISSION_PERM.GET_ROLES), permissionController.getRoles])

export default permissionRouter