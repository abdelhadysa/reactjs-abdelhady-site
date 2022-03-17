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

const { User, Message } = models

const getOne = async (req, res, next) => {
    try {
        const message = await Message.scope('hideSensitive').findAll({
            where: {
                Uuid: {
                    [Op.eq]: req.params.id,
                },
            },
            include: [User],
        })
        res.status(200).json(message)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const messages = await Message.scope('hideSensitive').findAll()
        res.status(200).json(messages)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    try {
        const message = await Message.scope('hideSensitive').create(req.body, {
            include: [User],
        })
        res.status(200).json(message)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    try {
        const message = await Message.scope('hideSensitive').update(req.body, {
            where: {
                Uuid: {
                    [Op.eq]: req.params.id,
                },
            },
        })
        res.status(200).json(message)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const message = await Message.scope('hideSensitive').destroy({
            where: {
                Uuid: {
                    [Op.eq]: req.params.id,
                },
            },
        })
        res.status(200).json(message)
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