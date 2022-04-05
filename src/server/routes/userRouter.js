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
import { D_USER_PERM, D_DEFAULT_AVATAR_PATH, D_DEFAULT_ATTACHMENTS_PATH, D_DEFAULT_MAX_ATTACHMENTS } from '../utils/defaults'
import multer from 'multer'

const avatarStorage = multer.diskStorage({
    destination: path.resolve(D_DEFAULT_AVATAR_PATH),
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
    }
})

const attachmentStorage = multer.diskStorage({
    destination: path.resolve(D_DEFAULT_ATTACHMENTS_PATH),
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
    }
})
  
const uploadAvatar = multer({ storage: avatarStorage, fileFilter: function fileFilter (req, file, cb) {
    if (file.size > 1000000) return cb(null, false)
    const ext = file.originalname.split('.')[1]
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png': return cb(null, true)
        default: return cb(null, false)
    }
} })

const uploadAttachments = multer({ storage: attachmentStorage, fileFilter: function fileFilter (req, file, cb) {
    if (file.size > 8000000) return cb(null, false)
    const ext = file.originalname.split('.')[1]
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'pdf':
        case 'txt':
        case 'md': return cb(null, true)
        default: return cb(null, false)
    }
} })

const userRouter = express.Router()

userRouter.get('/', [requirePerm(D_USER_PERM.GET_ALL), userController.getAll])
userRouter.get('/:id', [requirePerm(D_USER_PERM.GET), userController.getOne])
userRouter.post('/', [requirePerm(D_USER_PERM.CREATE), userController.createOne])
userRouter.put('/:id', [requirePerm(D_USER_PERM.UPDATE), uploadAvatar.single('avatar'), userController.updateOne])
userRouter.delete('/:id', [requirePerm(D_USER_PERM.DELETE), userController.deleteOne])

userRouter.get('/:id/post', [requirePerm(D_USER_PERM.GET_POSTS), userController.getPosts])
userRouter.post('/:id/post', [requirePerm(D_USER_PERM.CREATE_POST), uploadAttachments.array('attachments', D_DEFAULT_MAX_ATTACHMENTS), userController.createPost])
userRouter.put('/:id/post/:postId', [requirePerm(D_USER_PERM.UPDATE_POST), uploadAttachments.array('attachments', D_DEFAULT_MAX_ATTACHMENTS), userController.updatePost])
userRouter.delete('/:id/post/:postId', [requirePerm(D_USER_PERM.DELETE_POST), userController.deletePost])

userRouter.get('/:id/reply', [requirePerm(D_USER_PERM.GET_REPLIES), userController.getReplies])
userRouter.post('/:id/reply/:postId', [requirePerm(D_USER_PERM.CREATE_REPLY), uploadAttachments.array('attachments', D_DEFAULT_MAX_ATTACHMENTS), userController.createReply])
userRouter.post('/:id/reply/:postId/:replyId', [requirePerm(D_USER_PERM.CREATE_REPLY), uploadAttachments.array('attachments', D_DEFAULT_MAX_ATTACHMENTS), userController.createReply])
userRouter.put('/:id/reply/:replyId', [requirePerm(D_USER_PERM.UPDATE_REPLY), uploadAttachments.array('attachments', D_DEFAULT_MAX_ATTACHMENTS), userController.updateReply])
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