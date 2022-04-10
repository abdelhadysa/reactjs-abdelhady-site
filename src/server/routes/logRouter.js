import path from 'path'
import express from 'express'
import * as logController from '../controllers/logController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_LOG_PERM } from '../utils/defaults.js'

const logRouter = express.Router()

logRouter.get('/', [requirePerm(D_LOG_PERM.GET_ALL), logController.getAll])
logRouter.get('/:id', [requirePerm(D_LOG_PERM.GET), logController.getOne])
logRouter.post('/', [requirePerm(D_LOG_PERM.CREATE), logController.createOne])
logRouter.put('/:id', [requirePerm(D_LOG_PERM.UPDATE), logController.updateOne])
logRouter.delete('/:id', [requirePerm(D_LOG_PERM.DELETE), logController.deleteOne])

export default logRouter