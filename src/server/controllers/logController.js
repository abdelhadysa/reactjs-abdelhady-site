import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
const { Log } = models

// Log

const getAll = async (req, res, next) => {
    try {
        const logs = await Log.findAll()
        return res.status(200).json(logs)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const log = await Log.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(log)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Message } = req.body
    try {
        const log = await Log.create({
            ...Message && Message,
        })
        return res.status(200).json(log)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Message } = req.body
    try {
        const log = await Log.update({
            ...Message && Message,
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(log)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const log = await Log.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(log)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

export {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
}