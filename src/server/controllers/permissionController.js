import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
const { Permission, Role, Right } = models

// Permission

const getAll = async (req, res, next) => {
    try {
        const permissions = await Permission.findAll({ include: [{
            model: Right,
            include: Role
        }] })
        return res.status(200).json(permissions)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const permission = await Permission.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(permission)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description } = req.body
    try {
        const permission = await Permission.create({
            Name,
            Description,
        })
        return res.status(200).json(permission)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description } = req.body
    try {
        const permission = await Permission.update({
            Name,
            Description,
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(permission)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const permission = await Permission.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(permission)
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

// Permission Right

const getRoles = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const permission = await Permission.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(await permission.getRoles())
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getRoles,
}