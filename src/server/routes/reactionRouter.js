import path from 'path'
import express from 'express'
import * as reactionController from '../controllers/reactionController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_REACTION_PERM } from '../utils/defaults.js'

const reactionRouter = express.Router()

reactionRouter.get('/', [requirePerm(D_REACTION_PERM.GET_ALL), reactionController.getAll])
reactionRouter.get('/:id', [requirePerm(D_REACTION_PERM.GET), reactionController.getOne])
reactionRouter.post('/', [requirePerm(D_REACTION_PERM.CREATE), reactionController.createOne])
reactionRouter.put('/:id', [requirePerm(D_REACTION_PERM.UPDATE), reactionController.updateOne])
reactionRouter.delete('/:id', [requirePerm(D_REACTION_PERM.DELETE), reactionController.deleteOne])
reactionRouter.get('/:id/message', [requirePerm(D_REACTION_PERM.GET_MESSAGES), reactionController.getMessages])

export default reactionRouter