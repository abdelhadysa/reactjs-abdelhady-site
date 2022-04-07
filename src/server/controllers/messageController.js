import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
import { unlink } from 'fs/promises'

const { Message, Post, Reply, Engagement, Reaction, List, Tag, User, View, Attachment } = models

// Message

const getAll = async (req, res, next) => {
    try {
        const messages = await Message.findAll()
        return res.status(200).json(messages)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const message = await Message.findOne({
            where: {
                Uuid: id,
            },
            include: [Post, Reply, {
                model: Engagement,
                include: [User, Reaction]
            }, List, {
                model: View,
                include: User
            }, Attachment]
        })
        if (!message) return next(new HttpException(404, 'Message not found'))
        // Add view
        const hasViewed = await View.findOne({
            where: {
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            }
        })
        if (!hasViewed) {
            await View.create({
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            })
        }
        return res.status(200).json(message)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Title, Text } = req.body
    if (!Title || !Text) return next(new HttpException(400, 'Missing title or text of the message'))
    try {
        const result = await Message.create({
            ...Title && {Title},
            ...Text && {Text},
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Title, Text } = req.body
    if (!Title || !Text) return next(new HttpException(400, 'Missing title or text of the message'))
    try {
        const result = await Message.update({
            ...Title && {Title},
            ...Text && {Text},
        }, {
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    const t = await sequelize.transaction()
    try {
        const message = await Message.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!message) return next(new HttpException(404, 'Message not found'))
        const post = await message.getPost({ transaction: t })
        if (post) return next(new HttpException(403, 'Message associated with a post'))
        const reply = await message.getReply({ transaction: t })
        if (reply) return next(new HttpException(403, 'Message associated with a reply'))
        const attachments = await Attachment.findAll({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        if (attachments.length) {
            for (const attachment of attachments) {
                await attachment.destroy({ transaction: t })
                await unlink(attachment.AttachmentUrl)
            }
        }
        await message.destroy({ transaction: t })
        const result = await t.commit()
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

// Message Post

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll()
        return res.status(200).json(posts)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getPost = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const post = await Post.findOne({
            where: {
                MessageUuid: id,
            },
            include: [{
                model: Message,
                include: [{
                    model: Engagement,
                    include: [User, Reaction]
                }, List, {
                    model: View,
                    include: User
                },
                    Attachment
                ]
            }, Reply]
        })
        if (!post) return next(new HttpException(404, 'Message not found'))
        // Add view
        const hasViewed = await View.findOne({
            where: {
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            }
        })
        if (!hasViewed) {
            await View.create({
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            })
        }
        return res.status(200).json(post)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updatePost = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { Locked, Pinned } = req.body
    try {
        const post = await Post.findOne({
            where: {
                MessageUuid: id,
            }
        })
        if (!post) return next(new HttpException(404, 'No post found for this message'))
        const result = await post.update({
            ...Locked && {Locked},
            ...Pinned && {Pinned},
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deletePost = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    const t = await sequelize.transaction()
    try {
        const post = await Post.findOne({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        const replies = await post.countReplies({ transaction: t })
        const children = await post.countChildren({ transaction: t })
        if (replies > 0 || children > 0) return next(new HttpException(403, 'Post associated with replies or children'))
        await post.destroy({ transaction: t })
        const attachments = await Attachment.findAll({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        if (attachments.length) {
            for (const attachment of attachments) {
                await attachment.destroy({ transaction: t })
                await unlink(attachment.AttachmentUrl)
            }
        }
        await Message.destroy({ where: { Uuid: id }, transaction: t })
        const result = await t.commit()
        return res.status(200).json(result)
    } catch (e) {
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

export {
    getPosts,
    getPost,
    updatePost,
    deletePost,
}

// Message Reply

const getReplies = async (req, res, next) => {
    try {
        const replies = await Reply.findAll()
        return res.status(200).json(replies)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getReply = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const reply = await Reply.findOne({
            where: {
                MessageUuid: id,
            },
            include: [{
                model: Message,
                include: [{
                    model: Engagement,
                    include: [User, Reaction]
                }, List, {
                    model: View,
                    include: User
                },
                    Attachment
                ]
            }, Reply]
        })
        if (!reply) return next(new HttpException(404, 'Message not found'))
        // Add view
        const hasViewed = await View.findOne({
            where: {
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            }
        })
        if (!hasViewed) {
            await View.create({
                UserUuid: req.decodedJWTPayload.uuid,
                MessageUuid: id,
            })
        }
        return res.status(200).json(reply)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updateReply = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { ReplyingTo, ReplyingToUuid, PostUuid } = req.body
    const t = await sequelize.transaction()
    try {
        const reply = await Reply.findOne({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        if (!reply) throw new Error('No replies found for this message')
        if (ReplyingTo || ReplyingToUuid || PostUuid) {
            const otherReplies = await Reply.findAll({
                where: {
                    ReplyingTo: 'Reply',
                    ReplyingToUuid: reply.Uuid,
                }, transaction: t
            })
            if (otherReplies.length) {
                for (const otherReply of otherReplies) {
                    await otherReply.update({
                        ReplyingTo: 'Post',
                        ReplyingToUuid: otherReply.PostUuid,
                    }, { transaction: t })
                }
            }
        }
        await reply.update({
            ...ReplyingTo && ReplyingTo,
            ...ReplyingToUuid && ReplyingToUuid,
            ...PostUuid && PostUuid,
        }, { transaction: t })
        const result = await t.commit()
        return res.status(200).json(result)
    } catch (e) {
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const deleteReply = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    const t = await sequelize.transaction()
    try {
        const reply = await Reply.findOne({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        if(!reply) throw new Error('Reply not found')
        const otherReplies = await Reply.findAll({
            where: {
                ReplyingTo: 'Reply',
                ReplyingToUuid: reply.Uuid,
            }, transaction: t
        })
        if (otherReplies.length) {
            for (const otherReply of otherReplies) {
                await otherReply.update({
                    ReplyingTo: 'Post',
                    ReplyingToUuid: otherReply.PostUuid,
                }, { transaction: t })
            }
        }
        await reply.destroy({ transaction: t })
        const attachments = await Attachment.findAll({
            where: {
                MessageUuid: id,
            }, transaction: t
        })
        if (attachments.length) {
            for (const attachment of attachments) {
                await attachment.destroy({ transaction: t })
                await unlink(attachment.AttachmentUrl)
            }
        }
        await Message.destroy({ where: { Uuid: id }, transaction: t })
        const result = await t.commit()
        return res.status(200).json(result)
    } catch (e) {
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

export {
    getReplies,
    getReply,
    updateReply,
    deleteReply,
}

// Message Engagement

const getReactions = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const reactions = await Engagement.findAll({
            where: {
                MessageUuid: id,
            },
            include: Reaction
        })
        return res.status(200).json(reactions)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteReaction = async (req, res, next) => {
    if (!req.params.id || !req.params.reactionId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, reactionId } = req.params
    try {
        const result = await Engagement.destroy({
            where: {
                MessageUuid: id,
                ReactionUuid: reactionId,
            }
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

export {
    getReactions,
    deleteReaction,
}

// Message List

const getTags = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const tags = await List.findAll({
            where: {
                MessageUuid: id,
            },
            include: Tag
        })
        return res.status(200).json(tags)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const createTag = async (req, res, next) => {
    if (!req.params.id || !req.params.tagId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, tagId } = req.params
    try {
        if (!req.superAccess) {
            const message = await Message.findOne({
                where: {
                    Uuid: id,
                }
            })
            if (!message) return next(new HttpException(404, 'Message not found'))
            if (message.AuthorUuid !== req.decodedJWTPayload.uuid) return next(new HttpException(403, 'You are not the author'))
        }
        const tag = await List.findOne({
            where: {
                MessageUuid: id,
                TagUuid: tagId,
            },
        })
        if (tag) return next(new HttpException(400, 'Message tag already exists'))
        const result = await List.create({
            MessageUuid: id,
            TagUuid: tagId,
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteTag = async (req, res, next) => {
    if (!req.params.id || !req.params.tagId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, tagId } = req.params
    try {
        if (!req.superAccess) {
            const message = await Message.findOne({
                where: {
                    Uuid: id,
                }
            })
            if (!message) return next(new HttpException(404, 'Message not found'))
            if (message.AuthorUuid !== req.decodedJWTPayload.uuid) return next(new HttpException(403, 'You are not the author'))
        }
        const result = await List.destroy({
            where: {
                MessageUuid: id,
                TagUuid: tagId,
            },
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

export {
    getTags,
    createTag,
    deleteTag,
}