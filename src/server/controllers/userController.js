/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import models from 'Database/sequelize-models'
import { Op } from 'sequelize'
import httpException from '../utils/httpException'
import isUuid from '../utils/isUuid'

const { User, Message, Role } = models

const getOne = async (req, res, next) => {
    try {
        const user = await User.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Username']: req.params.id,
            },
            include: [Message, Role],
        })
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const users = await User.scope('hideSensitive').findAll()
        res.status(200).json(users)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    try {
        const user = await User.scope('hideSensitive').create(req.body, {
            include: [Message, Role],
        })
        res.status(200).json(user)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    try {
        const user = await User.scope('hideSensitive').update(req.body, {
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
        const user = await User.scope('hideSensitive').destroy({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Username']: req.params.id,
            },
        })
        res.status(200).json(user)
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
}