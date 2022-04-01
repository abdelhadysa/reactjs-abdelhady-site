/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as userController from '../controllers/userController'
import requirePerm from '../middleware/requirePerm'
import { D_USER_PERM } from '../utils/defaults'

const userRouter = express.Router()

userRouter.get('/', [requirePerm(D_USER_PERM.GET_ALL), userController.getAll])
userRouter.get('/:id', [requirePerm(D_USER_PERM.GET), userController.getOne])
userRouter.post('/', [requirePerm(D_USER_PERM.CREATE), userController.createOne])
userRouter.put('/:id', [requirePerm(D_USER_PERM.UPDATE), userController.updateOne])
userRouter.delete('/:id', [requirePerm(D_USER_PERM.DELETE), userController.deleteOne])

userRouter.get('/:id/post', [requirePerm(D_USER_PERM.GET_POSTS), userController.getPosts])
userRouter.post('/:id/post', [requirePerm(D_USER_PERM.CREATE_POST), userController.createPost])
userRouter.put('/:id/post/:postId', [requirePerm(D_USER_PERM.UPDATE_POST), userController.updatePost])
userRouter.delete('/:id/post/:postId', [requirePerm(D_USER_PERM.DELETE_POST), userController.deletePost])

userRouter.get('/:id/reply', [requirePerm(D_USER_PERM.GET_REPLIES), userController.getReplies])
userRouter.post('/:id/reply/:postId', [requirePerm(D_USER_PERM.CREATE_REPLY), userController.createReply])
userRouter.put('/:id/reply/:replyId', [requirePerm(D_USER_PERM.UPDATE_REPLY), userController.updateReply])
userRouter.delete('/:id/reply/:replyId', [requirePerm(D_USER_PERM.DELETE_REPLY), userController.deleteReply])

userRouter.get('/:id/role', [requirePerm(D_USER_PERM.GET_ROLES), userController.getRoles])
userRouter.post('/:id/role/:roleId', [requirePerm(D_USER_PERM.CREATE_ROLE), userController.createRole])
userRouter.delete('/:id/role/:roleId', [requirePerm(D_USER_PERM.DELETE_ROLE), userController.deleteRole])

userRouter.get('/:id/reaction', [requirePerm(D_USER_PERM.GET_REACTIONS), userController.getReactions])
userRouter.post('/:id/reaction/:reactionId/:messageId', [requirePerm(D_USER_PERM.CREATE_REACTION), userController.createReaction])
userRouter.delete('/:id/reaction/:reactionId/:messageId', [requirePerm(D_USER_PERM.DELETE_REACTION), userController.deleteReaction])

userRouter.get('/:id/tag', [requirePerm(D_USER_PERM.GET_TAGS), userController.getTags])
userRouter.post('/:id/tag/:tagId', [requirePerm(D_USER_PERM.CREATE_TAG), userController.createTag])
userRouter.delete('/:id/tag/:tagId', [requirePerm(D_USER_PERM.DELETE_TAG), userController.deleteTag])

export default userRouter