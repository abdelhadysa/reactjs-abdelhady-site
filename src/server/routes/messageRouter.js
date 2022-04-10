import path from 'path'
import express from 'express'
import * as messageController from '../controllers/messageController.js'
import requirePerm from '../middleware/requirePerm.js'
import { D_MESSAGE_PERM } from '../utils/defaults.js'

const messageRouter = express.Router()

messageRouter.get('/', [requirePerm(D_MESSAGE_PERM.GET_ALL), messageController.getAll])
messageRouter.get('/:id', [requirePerm(D_MESSAGE_PERM.GET), messageController.getOne])
messageRouter.post('/', [requirePerm(D_MESSAGE_PERM.CREATE), messageController.createOne])
messageRouter.put('/:id', [requirePerm(D_MESSAGE_PERM.UPDATE), messageController.updateOne])
messageRouter.delete('/:id', [requirePerm(D_MESSAGE_PERM.DELETE), messageController.deleteOne])

messageRouter.get('/post/all', [requirePerm(D_MESSAGE_PERM.GET_POSTS), messageController.getPosts])
messageRouter.get('/:id/post', [requirePerm(D_MESSAGE_PERM.GET_POST), messageController.getPost])
messageRouter.put('/:id/post', [requirePerm(D_MESSAGE_PERM.UPDATE_POST), messageController.updatePost])
messageRouter.delete('/:id/post', [requirePerm(D_MESSAGE_PERM.DELETE_POST), messageController.deletePost])

messageRouter.get('/reply/all', [requirePerm(D_MESSAGE_PERM.GET_REPLIES), messageController.getReplies])
messageRouter.get('/:id/reply', [requirePerm(D_MESSAGE_PERM.GET_REPLY), messageController.getReply])
messageRouter.put('/:id/reply', [requirePerm(D_MESSAGE_PERM.UPDATE_REPLY), messageController.updateReply])
messageRouter.delete('/:id/reply', [requirePerm(D_MESSAGE_PERM.DELETE_REPLY), messageController.deleteReply])

messageRouter.get('/:id/reaction', [requirePerm(D_MESSAGE_PERM.GET_REACTIONS), messageController.getReactions])
messageRouter.delete('/:id/reaction/:reactionId', [requirePerm(D_MESSAGE_PERM.DELETE_REACTION), messageController.deleteReaction])

messageRouter.get('/:id/tag', [requirePerm(D_MESSAGE_PERM.GET_TAGS), messageController.getTags])
messageRouter.post('/:id/tag/:tagId', [requirePerm(D_MESSAGE_PERM.CREATE_TAG), messageController.createTag])
messageRouter.delete('/:id/tag/:tagId', [requirePerm(D_MESSAGE_PERM.DELETE_TAG), messageController.deleteTag])

export default messageRouter