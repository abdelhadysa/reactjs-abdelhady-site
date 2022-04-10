import path from 'path'
import express from 'express'
import * as tagController from '../controllers/tagController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_TAG_PERM } from '../utils/defaults.js'

const tagRouter = express.Router()

tagRouter.get('/', [requirePerm(D_TAG_PERM.GET_ALL), tagController.getAll])
tagRouter.get('/:id', [requirePerm(D_TAG_PERM.GET), tagController.getOne])
tagRouter.post('/', [requirePerm(D_TAG_PERM.CREATE), tagController.createOne])
tagRouter.put('/:id', [requirePerm(D_TAG_PERM.UPDATE), tagController.updateOne])
tagRouter.delete('/:id', [requirePerm(D_TAG_PERM.DELETE), tagController.deleteOne])
tagRouter.get('/:id/message', [requirePerm(D_TAG_PERM.GET_MESSAGES), tagController.getMessages])

export default tagRouter