import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'

const { Message, Post, Reply, Engagement, Reaction, List, Tag, User } = models

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
            }, List]
        })
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
            Title,
            Text,
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
            Title,
            Text,
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
    try {
        const message = await Message.destroy({
            where: {
                Uuid: id,
            }
        })
        return res.status(200).json(message)
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
        const post = Post.findOne({
            where: {
                MessageUuid: id,
            },
            include: {
                model: Message,
                include: [{
                    model: Engagement,
                    include: [User, Reaction]
                }, List]
            }
        })
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
        const post = Post.findOne({
            where: {
                MessageUuid: id,
            }
        })
        if (!post) return next(new HttpException(404, 'No post found for this message'))
        const result = Post.update({
            Locked,
            Pinned,
        }, {
            where: {
                MessageUuid: id,
            }
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deletePost = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const post = Post.destroy({
            where: {
                MessageUuid: id,
            }
        })
        return res.status(200).json(post)
    } catch (e) {
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
            }
        })
        return res.status(200).json(reply)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const updateReply = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.body) return next(new HttpException(400, 'Missing request body'))
    const { PostUuid } = req.body
    try {
        const reply = await Reply.findOne({
            where: {
                MessageUuid: id,
            }
        })
        if (!reply) return next(new HttpException(404, 'No replies found for this message'))
        const result = await Reply.update({
            PostUuid,
        }, {
            where: {
                MessageUuid: id,
            }
        })
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteReply = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const reply = await Reply.destroy({
            where: {
                MessageUuid: id,
            }
        })
        return res.status(200).json(reply)
    } catch (e) {
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