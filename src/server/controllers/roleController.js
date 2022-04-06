import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
const { Role } = models

// Role

const getAll = async (req, res, next) => {
    try {
        const roles = await Role.findAll()
        return res.status(200).json(roles)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const role = await Role.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(role)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description, Order, Color, Super } = req.body
    try {
        const role = await Role.create({
            ...Name && {Name},
            ...Description && {Description},
            ...Order && {Order},
            ...Color && {Color},
            ...Super && {Super},
        })
        return res.status(200).json(role)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description, Order, Color, Super } = req.body
    try {
        const role = await Role.update({
            ...Name && {Name},
            ...Description && {Description},
            ...Order && {Order},
            ...Color && {Color},
            ...Super && {Super},
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(role)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const role = await Role.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(role)
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

// Role Right

const getPermissions = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const role = await Role.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(await role.getPermissions())
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createPermission = async (req, res, next) => {
    if (!req.params.id || !req.params.permissionId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, permissionId } = req.params
    try {
        const role = await Role.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(await role.addPermission(permissionId))
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deletePermission = async (req, res, next) => {
    if (!req.params.id || !req.params.permissionId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, permissionId } = req.params
    try {
        const role = await Role.findOne({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(await role.removePermission(permissionId))
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getPermissions,
    createPermission,
    deletePermission,
}