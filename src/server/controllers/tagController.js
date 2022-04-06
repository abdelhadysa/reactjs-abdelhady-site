import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
const { Tag, List, Message } = models

// Tag

const getAll = async (req, res, next) => {
    try {
        const tags = await Tag.findAll()
        return res.status(200).json(tags)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const tag = await Tag.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(tag)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Color, Featured } = req.body
    try {
        const tag = await Tag.create({
            ...Name && {Name},
            ...Color && {Color},
            ...Featured && {Featured},
        })
        return res.status(200).json(tag)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Color, Featured } = req.body
    try {
        const tag = await Tag.update({
            ...Name && {Name},
            ...Color && {Color},
            ...Featured && {Featured},
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(tag)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const tag = await Tag.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(tag)
    } catch(e) {
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

// Tag List

const getMessages = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const list = await List.findAll({
            where: {
                TagUuid: id,
            },
            include: Message
        })
        return res.status(200).json(list)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getMessages,
}