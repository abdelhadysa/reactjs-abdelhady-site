import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
import crypto from 'crypto'
import { unlink } from 'fs/promises'

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
        const AttachmentUrl = req.file !== undefined ? req.file.path : undefined
        if (!AttachmentUrl) return next(new HttpException(400, 'Invalid attachment file'))
        const attachment = await Attachment.create({
            Uuid: crypto.randomUUID(),
            ...(Name || Name === null) && {Name},
            ...(Description || Description === null) && {Description},
            ...AttachmentUrl && {AttachmentUrl},
            ...MessageUuid && {MessageUuid},
            ...UserUuid && {UserUuid},
        })
        return res.status(200).json(attachment)
    } catch (e) {
        if (req.file) {
            const { file } = req
            const filePath = file.path
            await unlink(filePath)
        }
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Name, Description, MessageUuid, UserUuid } = req.body
    const t = await sequelize.transaction()
    try {
        const AttachmentUrl = req.file !== undefined ? req.file.path : undefined
        //if (!AttachmentUrl) return next(new HttpException(400, 'Invalid attachment file'))
        const attachment = await Attachment.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!attachment) return next(new HttpException(404, 'Attachment not found'))
        const oldUrl = attachment.AttachmentUrl
        await attachment.update({
            Uuid: crypto.randomUUID(),
            ...(Name || Name === null) && {Name},
            ...(Description || Description === null) && {Description},
            ...AttachmentUrl && {AttachmentUrl},
            ...MessageUuid && {MessageUuid},
            ...UserUuid && {UserUuid},
        }, { transaction: t })
        AttachmentUrl && (await unlink(oldUrl))
        const result = await t.commit()
        return res.status(200).json(result)
    } catch (e) {
        if (req.file) {
            const { file } = req
            const filePath = file.path
            await unlink(filePath)
        }
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    const t = await sequelize.transaction()
    try {
        const attachment = await Attachment.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!attachment) return next(new HttpException(404, 'Attachment not found'))
        if (attachment.UserUuid !== req.decodedJWTPayload.uuid && !req.superAccess) return next(new HttpException(403, 'You are not authorized to access this attachment'))
        const oldUrl = attachment.AttachmentUrl
        await attachment.destroy({ transaction: t })
        await unlink(oldUrl)
        const result = t.commit()
        return res.status(200).json(result)
    } catch (e) {
        await t.rollback()
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