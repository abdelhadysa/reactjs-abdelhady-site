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

const { User, Message, Reaction, Role, Permission, RolePermission, MessageReaction } = models

const getOne = async (req, res, next) => {
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
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
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

const alterRole = async (req, res, next) => {
    try {
        if (!req.body.Action || (req.body.Action !== 'Grant' && req.body.Action !== 'Revoke')) return next(new httpException(400, 'Invalid action (Grant or Revoke needed)'))
        const role = await Role.findOne({
            where: {
                [isUuid(req.body.Role) ? 'Uuid' : 'Name']: req.body.Role,
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
        let newUserRolePermissions
        if (req.body.Action === 'Grant') {
            newUserRolePermissions = await user.addRolePermissions(rolePermissions)
        } else {
            newUserRolePermissions = await user.removeRolePermissions(rolePermissions)
        }
        res.status(200).json(Object.assign({}, user, { RolePermissions: newUserRolePermissions }))
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
    alterRole
}