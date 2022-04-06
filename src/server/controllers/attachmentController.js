import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
import crypto from 'crypto'

const { Attachment } = models

// Attachment

const getAll = async (req, res, next) => {
    try {
        const attachments = await Attachment.findAll()
        return res.status(200).json(attachments)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const attachment = await Attachment.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!attachment) return next(new HttpException(404, 'Attachment not found'))
        //if (attachment.UserUuid !== req.decodedJWTPayload.uuid && !req.superAccess) return next(new HttpException(403, 'You are not authorized to access this attachment'))
        return res.status(200).json(attachment)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description, MessageUuid, UserUuid } = req.body
    try {
        const AttachmentUrl = req.file !== undefined ? req.file.filename : undefined
        if (!AttachmentUrl) return next(new HttpException(400, 'Invalid attachment file'))
        const attachment = await Attachment.create({
            Uuid: crypto.randomUUID(),
            ...(Name || Name === null) && Name,
            ...(Description || Description === null) && {Description},
            ...AttachmentUrl && {AttachmentUrl},
            ...MessageUuid && {MessageUuid},
            ...UserUuid && {UserUuid},
        })
        return res.status(200).json(attachment)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description, MessageUuid, UserUuid } = req.body
    try {
        const AttachmentUrl = req.file !== undefined ? req.file.filename : undefined
        if (!AttachmentUrl) return next(new HttpException(400, 'Invalid attachment file'))
        const attachment = await Attachment.update({
            Uuid: crypto.randomUUID(),
            ...(Name || Name === null) && Name,
            ...(Description || Description === null) && {Description},
            ...AttachmentUrl && {AttachmentUrl},
            ...MessageUuid && {MessageUuid},
            ...UserUuid && {UserUuid},
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(attachment)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const attachment = await Attachment.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!attachment) return next(new HttpException(404, 'Attachment not found'))
        if (attachment.UserUuid !== req.decodedJWTPayload.uuid && !req.superAccess) return next(new HttpException(403, 'You are not authorized to access this attachment'))
        const result = await Attachment.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(result)
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