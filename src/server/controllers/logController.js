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
//import isUuid from '../utils/isUuid'

const { Log } = models

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const log = await Log.findOne({
            where: {
                ['Uuid']: req.params.id,
            },
        })
        if (!log) return next(new httpException(404, 'No log found'))
        res.status(200).json(log)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const getAll = async (_req, res, next) => {
    try {
        const logs = await Log.findAll({})
        if (!logs.length) return next(new httpException(404, 'No logs found'))
        res.status(200).json(logs)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new httpException(400, 'Missing Request Body'))
    try {
        const log = await Log.create(req.body)
        res.status(200).json(log)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id || !req.body) return next(new httpException(400, 'Missing ID Parameter or Request Body'))
    try {
        const log = await Log.update(req.body, {
            where: {
                ['Uuid']: req.params.id,
            },
        })
        res.status(200).json(log)
    } catch (e) {
        next(new httpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new httpException(400, 'Missing ID Parameter'))
    try {
        const log = await Log.destroy({
            where: {
                ['Uuid']: req.params.id,
            },
        })
        res.status(200).json(log)
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