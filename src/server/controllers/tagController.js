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

const { User, Message, Tag, MessageTag } = models

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const tag = await Tag.findOne({
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Name']: req.params.id,
            },
            include: [Message, {
                model: MessageTag,
                include: [User]
            }]
        })
        if (!tag) return next(new httpException(404, 'Tag not found'))
        res.status(200).json(tag)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const tag = await Tag.findAll({ include: [Message, {
            model: MessageTag,
            include: [User],
        }]})
        if (!tag.length) return next(new httpException(404, 'Tags not found'))
        res.status(200).json(tag)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new httpException(400, 'Missing Request Body'))
    try {
        const tag = await Tag.create(req.body)
        res.status(200).json(tag)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id || !req.body) return next(new httpException(400, 'Missing ID Parameter or Request Body'))
    try {
        const tag = await Tag.update(req.body, {
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Name']: req.params.id,
            },
        })
        res.status(200).json(tag)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const tag = await Tag.delete({
            where: {
                [isUuid(req.params.id) ? 'Uuid': 'Name']: req.params.id,
            }
        })
        res.status(200).json(tag)
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