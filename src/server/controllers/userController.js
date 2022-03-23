/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import models from 'Database/sequelize-models'
//import { Op } from 'sequelize'
import httpException from '../utils/httpException'
import isUuid from '../utils/isUuid'

const { User, Message, Reaction, Role, Permission, Tag, RolePermission, MessageReaction, MessageTag } = models

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const user = await User.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Username']: req.params.id,
            },
            include: [Message, {
                model: RolePermission,
                include: [Role, Permission]
            }, {
                model: MessageReaction,
                include: [Message, Reaction]
            }],
        })
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const users = await User.scope('hideSensitive').findAll({ include: [Message, {
            model: RolePermission,
            include: [Role, Permission]
        }, {
            model: MessageReaction,
            include: [Message, Reaction]
        }] })
        res.status(200).json(users)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new httpException(400, 'Missing Request Body'))
    try {
        const user = await User.create(req.body)
        const userRole = await Role.scope('defaultUser').findOne()
        const userRolePerms = await user.addRolePermission(await userRole.getRolePermissions())
        res.status(200).json(Object.assign({}, user, userRolePerms))
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.body || !req.params.id) return next(new httpException(400, 'Missing Request Body or ID'))
    try {
        const user = await User.update(req.body, {
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Username']: req.params.id,
            },
        })
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const user = await User.destroy({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Username']: req.params.id,
            },
        })
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const alterRolePermission = async (req, res, next) => {
    if (!req.params.id || !req.params.roleId) return next(new httpException(400, 'Missing ID Parameter'))
    if (!req.body.Action || (req.body.Action !== 'Grant' && req.body.Action !== 'Revoke')) return next(new httpException(400, 'Invalid action (Grant or Revoke needed)'))
    try {
        const role = await Role.findOne({
            where: {
                [isUuid(req.params.roleId) ? 'Uuid' : 'Name']: req.params.roleId,
            },
        })
        if (!role) return next(new httpException(404, 'Requested role does not exist'))
        const user = await User.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Username']: req.params.id,
            },
        })
        if (!user) return next(new httpException(404, 'Requested user does not exist'))
        const rolePermissions = await role.getRolePermissions()
        if (req.body.Action === 'Grant') {
            await user.addRolePermissions(rolePermissions)
        } else {
            await user.removeRolePermissions(rolePermissions)
        }
        res.status(200).json(await user.getRolePermissions())
    } catch (e) {
        next(new httpException(500, e))
    }
}

const alterMessageReaction = async (req, res, next) => {
    if (!req.params.id || !req.params.messageId || !req.params.reactionId) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const user = await User.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Username']: req.params.id,
            },
        })
        if (!user) return next(new httpException(404, 'Requested user does not exist'))
        const message = await Message.findOne({
            where: {
                [isUuid(req.params.messageId) ? 'Uuid': 'Name']: req.params.messageId,
            },
        })
        if (!message) return next(new httpException(404, 'Requested message does not exist'))
        const reaction = await Reaction.findOne({
            where: {
                [isUuid(req.params.reactionId) ? 'Uuid': 'Name']: req.params.reactionId,
            },
        })
        if (!reaction) return next(new httpException(404, 'Requested reaction does not exist'))
        const messageReaction = await MessageReaction.findOne({
            where: {
                ReactionUuid: reaction.Uuid,
                MessageUuid: message.Uuid,
            },
        })
        if (!messageReaction) return next(new httpException(404, 'Requested message reaction doesn\'t exist'))
        const allMessageReactions = await message.getMessageReactions()
        if (await user.hasMessageReaction(messageReaction)) {
            await user.removeMessageReaction(messageReaction)
        } else {
            for (const singleMessageReaction of allMessageReactions) {
                if (await user.hasMessageReaction(singleMessageReaction)) {
                    return next(new httpException(400, 'User already reacted to this message'))
                }
            }
            await user.addMessageReaction(messageReaction)
        }
        res.status(200).json(await user.getMessageReactions())
    } catch (e) {
        next(new httpException(500, e))
    }
}

const alterMessageTag = async (req, res, next) => {
    if (!req.params.id || !req.params.messageId || !req.params.tagId) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const user = await User.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Username']: req.params.id,
            },
        })
        if (!user) return next(new httpException(404, 'Requested user does not exist'))
        const message = await Message.findOne({
            where: {
                [isUuid(req.params.messageId) ? 'Uuid': 'Name']: req.params.messageId,
            },
        })
        if (!message) return next(new httpException(404, 'Requested message does not exist'))
        const tag = await Tag.findOne({
            where: {
                [isUuid(req.params.tagId) ? 'Uuid': 'Name']: req.params.tagId,
            },
        })
        if (!tag) return next(new httpException(404, 'Requested tag does not exist'))
        const messageTag = await MessageTag.findOne({
            where: {
                TagUuid: tag.Uuid,
                MessageUuid: message.Uuid,
            },
        })
        if (!messageTag) return next(new httpException(404, 'Requested message tag doesn\'t exist'))
        if (await user.hasMessageTag(messageTag)) {
            await user.removeMessageTag(messageTag)
        } else {
            await user.addMessageTag(messageTag)
        }
        res.status(200).json(await user.getMessageTags())
    } catch (e) {
        next(new httpException(500, e))
    }
}

export {
    getOne,
    getAll,
    createOne,
    updateOne,
    deleteOne,
    alterRolePermission,
    alterMessageReaction,
    alterMessageTag,
}