/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as messageController from '../controllers/messageController'
import requirePerm from '../middleware/requirePerm'
import { D_MESSAGE_PERM } from '../utils/defaults'

const messageRouter = express.Router()

messageRouter.get('/', [requirePerm(D_MESSAGE_PERM.GET_ALL), messageController.getAll])
messageRouter.get('/:id', [requirePerm(D_MESSAGE_PERM.GET), messageController.getOne])
messageRouter.post('/', [requirePerm(D_MESSAGE_PERM.CREATE), messageController.createOne])
messageRouter.put('/:id', [requirePerm(D_MESSAGE_PERM.UPDATE), messageController.updateOne])
messageRouter.delete('/:id', [requirePerm(D_MESSAGE_PERM.DELETE), messageController.deleteOne])

messageRouter.get('/post', [requirePerm(D_MESSAGE_PERM.GET_POSTS), messageController.getPosts])
messageRouter.get('/:id/post', [requirePerm(D_MESSAGE_PERM.GET_POST), messageController.getPost])
messageRouter.put('/:id/post', [requirePerm(D_MESSAGE_PERM.UPDATE_POST), messageController.updatePost])
messageRouter.delete('/:id/post', [requirePerm(D_MESSAGE_PERM.DELETE_POST), messageController.deletePost])

messageRouter.get('/reply', [requirePerm(D_MESSAGE_PERM.GET_REPLIES), messageController.getReplies])
messageRouter.get('/:id/reply', [requirePerm(D_MESSAGE_PERM.GET_REPLY), messageController.getReply])
messageRouter.put('/:id/reply', [requirePerm(D_MESSAGE_PERM.UPDATE_REPLY), messageController.updateReply])
messageRouter.delete('/:id/reply', [requirePerm(D_MESSAGE_PERM.DELETE_REPLY), messageController.deleteReply])

messageRouter.get('/:id/reaction', [requirePerm(D_MESSAGE_PERM.GET_REACTIONS), messageController.getReactions])
messageRouter.delete('/:id/reaction/:reactionId', [requirePerm(D_MESSAGE_PERM.DELETE_REACTION), messageController.deleteReaction])

messageRouter.get('/:id/tag', [requirePerm(D_MESSAGE_PERM.GET_TAGS), messageController.getTags])
messageRouter.post('/:id/tag/:tagId', [requirePerm(D_MESSAGE_PERM.CREATE_TAG), messageController.createTag])
messageRouter.delete('/:id/tag/:tagId', [requirePerm(D_MESSAGE_PERM.DELETE_TAG), messageController.deleteTag])

export default messageRouter