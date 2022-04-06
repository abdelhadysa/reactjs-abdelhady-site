import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
const { Reaction, Engagement, Message } = models

// Reaction

const getAll = async (req, res, next) => {
    try {
        const reactions = await Reaction.findAll()
        return res.status(200).json(reactions)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const reaction = await Reaction.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(reaction)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Points } = req.body
    try {
        const reaction = await Reaction.create({
            ...Name && {Name},
            ...Points && {Points},
        })
        return res.status(200).json(reaction)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Points } = req.body
    try {
        const reaction = await Reaction.update({
            ...Name && {Name},
            ...Points && {Points},
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(reaction)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const reaction = await Reaction.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(reaction)
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

// Reaction Engagement

const getMessages = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const engagement = await Engagement.findAll({
            where: {
                ReactionUuid: id,
            },
            include: Message
        })
        return res.status(200).json(engagement)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getMessages,
}