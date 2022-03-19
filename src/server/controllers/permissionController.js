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

const { Permission, Role } = models

const getOne = async (req, res, next) => {
    try {
        const permission = await Permission.scope('hideSensitive').findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Name']: req.params.id,
            },
            include: [Role],
        })
        res.status(200).json(permission)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const permissions = await Permission.scope('hideSensitive').findAll()
        res.status(200).json(permissions)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    try {
        const permission = await Permission.scope('hideSensitive').create(req.body)
        res.status(200).json(permission)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    try {
        const permission = await Permission.scope('hideSensitive').update(req.body, {
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Name']: req.params.id,
            },
        })
        res.status(200).json(permission)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const permission = await Permission.scope('hideSensitive').destroy({
            where: {
                [isUuid(req.params.id) ? 'Uuid' : 'Name']: req.params.id,
            },
        })
        res.status(200).json(permission)
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