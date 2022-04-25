import models, { sequelize } from 'Database/sequelize-models'
import HttpException from '../utils/HttpException.js'
import crypto from 'crypto'
import { hashPass } from '../utils/BcryptManager.js'
import { D_DEFAULT_MAX_ATTACHMENTS } from '../utils/defaults.js'
import { unlink } from 'fs/promises'

// User

const { User, Message, Post, Reply, Engagement, Reaction, Favorite, Grant, Role, Right, Permission, Attachment } = models

const getAll = async (req, res, next) => {
    try {
        const data = req.superAccess === true ? await User.findAll() : await User.scope('hideSensitive').findAll()
        return res.status(200).json(data)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const getOne = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    try {
        const data = req.superAccess === true ? await User.findOne({ where: { Uuid: req.params.id },
            include: [Engagement, {
                model: Post,
                include: {
                    model: Message,
                    include: {
                        model: Engagement,
                        include: [User, Reaction],
                    }, 
                },
            }, {
                model: Reply,
                include: {
                    model: Message,
                    include: {
                        model: Engagement,
                        include: [User, Reaction],
                    }, 
                },
            }, {
                model: Grant,
                include: {
                    model: Role,
                    include: {
                        model: Right,
                        include: [ Permission ],
                    }
                },
            }]
        }) :
            req.params.id === req.decodedJWTPayload.uuid ? await User.scope('hideSensitive').findOne({ where: { Uuid: req.params.id },
                include: [Engagement, {
                    model: Post,
                    include: {
                        model: Message,
                        include: {
                            model: Engagement,
                            include: [User, Reaction],
                        }, 
                    },
                }, {
                    model: Reply,
                    include: {
                        model: Message,
                        include: {
                            model: Engagement,
                            include: [User, Reaction],
                        }, 
                    },
                }, {
                    model: Grant,
                    include: {
                        model: Role,
                        include: {
                            model: Right,
                            include: [ Permission ],
                        }
                    },
                }]
            }) : undefined
        if (!data) throw new Error('Encountered an error while retrieving data')
        return res.status(200).json(data)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    const { Username, Password, Email, AvatarUrl } = req.body
    if (!Username || !Password) return next(new HttpException(400, 'Username or password not found'))
    try {
        const PasswordHash = Password ? await hashPass(Password) : undefined
        const result = await User.create({
            Uuid: crypto.randomUUID(),
            ...Username && {Username},
            ...PasswordHash && {PasswordHash},
            ...(Email || Email === null) && {Email},
            ...(AvatarUrl || AvatarUrl === null) && {AvatarUrl},
            Device: null,
            IpAddress: null,
            LastVisit: null,
        })
        return res.status(200).json(result)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const updateOne = async (req, res, next) => {
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { Username, Password, Email } = req.body
    const { id } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const AvatarUrl = req.file !== undefined ? req.file.path : undefined
    const t = await sequelize.transaction()
    try {
        const PasswordHash = Password ? await hashPass(Password) : undefined
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const oldUrl = user.AvatarUrl
        await user.update({
            ...Username && {Username},
            ...PasswordHash && {PasswordHash},
            ...(Email || Email === null) && {Email},
            ...(AvatarUrl || AvatarUrl === null) && {AvatarUrl},
        }, { transaction: t })
        if (AvatarUrl && oldUrl) {
            await unlink(oldUrl)
        }
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
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
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const posts = await user.countPosts()
        const replies = await user.countReplies()
        const attachments = await user.countAttachments()
        if (posts > 0 || replies > 0 || attachments > 0) return next(new HttpException(403, 'User associated with a post, reply or an attachment'))
        const oldUrl = user.AvatarUrl
        const result = await user.destroy()
        oldUrl && (await unlink(oldUrl))
        return res.status(200).json(result)
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

// User Post

const getPosts = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const posts = await user.getPosts()
        return res.status(200).json(posts)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createPost = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    const { id } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const { Title, Text } = req.body
    if (!Title || !Text) return next(new HttpException(400, 'Missing post title or text'))
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const message = await Message.create({
            Uuid: crypto.randomUUID(),
            Title,
            Text
        }, { transaction: t })
        await Post.create({
            Uuid: crypto.randomUUID(),
            AuthorUuid: user.Uuid,
            LastEditorUuid: null,
            MessageUuid: message.Uuid,
            Locked: false,
            Pinned: false,
        }, { transaction: t })
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if(!file) continue
                const filePath = file.path
                await Attachment.create({
                    AttachmentUrl: filePath,
                    UserUuid: user.Uuid,
                    MessageUuid: message.Uuid,
                }, { transaction: t })
            }
        }
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if (!file) continue
                const filePath = file.path
                await unlink(filePath)
            }
        }
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const updatePost = async (req, res, next) => {
    if (!req.params.id || !req.params.postId) return next(new HttpException(400, 'Missing ID in request parameter'))
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    const { id, postId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const { Title, Text } = req.body
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) throw new Error('User not found')
        const post = await Post.findOne({
            where: {
                Uuid: postId,
            }, transaction: t
        })
        if(!post) throw new Error('Post not found')
        await Message.update({
            ...Title && {Title},
            ...Text && {Text},
        }, { 
            where: {
                Uuid: post.MessageUuid,
            }, transaction: t
         })
        await post.setPostLastEditor(user.Uuid, { transaction: t })
        if (req.files && req.files.length) {
            const message = await post.getMessage({ transaction: t })
            const attachments = await message.countAttachments({ transaction: t })
            if (attachments >= D_DEFAULT_MAX_ATTACHMENTS) throw new Error('Message has too many attachments')
            const totalAttachments = req.files.length + attachments
            if (totalAttachments > D_DEFAULT_MAX_ATTACHMENTS) throw new Error(`Exceeding the maximum allowed attachments by ${totalAttachments - D_DEFAULT_MAX_ATTACHMENTS}`)
            for (const file of req.files) {
                if(!file) continue
                const filePath = file.path
                await Attachment.create({
                    AttachmentUrl: filePath,
                    UserUuid: user.Uuid,
                    MessageUuid: post.MessageUuid,
                }, { transaction: t })
            }
        }
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if (!file) continue
                const filePath = file.path
                await unlink(filePath)
            }
        }
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const deletePost = async (req, res, next) => {
    if (!req.params.id || !req.params.postId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, postId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) throw new Error('User not found')
        const post = await Post.findOne({
            where: {
                Uuid: postId,
            }, transaction: t
        })
        if(!post) throw new Error('Post not found')
        const replies = await post.countReplies({ transaction: t })
        if (replies > 0) return next(new HttpException(403, 'Post associated with replies'))
        await post.destroy({ transaction: t })
        const attachments = await Attachment.findAll({
            where: {
                MessageUuid: post.MessageUuid,
            }, transaction: t
        })
        if (attachments.length) {
            for (const attachment of attachments) {
                await attachment.destroy({ transaction: t })
                await unlink(attachment.AttachmentUrl)
            }
        }
        await Message.destroy({ where: { Uuid: post.MessageUuid }, transaction: t })
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
}

// User Reply

const getReplies = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const replies = await user.getReplies()
        return res.status(200).json(replies)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createReply = async (req, res, next) => {
    if (!req.params.id || !req.params.postId) return next(new HttpException(400, 'Missing ID in request parameter'))
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    const { id, postId, replyId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const { Title, Text } = req.body
    if (!Title || !Text) return next(new HttpException(400, 'Missing reply title or text'))
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) throw new Error('User not found')
        const post = await Post.findOne({
            where: {
                Uuid: postId,
            }, transaction: t
        })
        if (!post) throw new Error('Post not found')
        if (post.Locked === true) throw new Error('Post is locked')
        let ReplyingTo
        let ReplyingToUuid
        if (replyId) {
            const reply = await Reply.findOne({
                where: {
                    Uuid: replyId,
                    PostUuid: postId,
                }, transaction: t
            })
            if (!reply) throw new Error('Reply not found')
            if (reply.ReplyingTo !== 'Post') throw new Error('Cannot reply to deeply nested replies')
            ReplyingTo = 'Reply'
            ReplyingToUuid = replyId
        } else {
            ReplyingTo = 'Post'
            ReplyingToUuid = postId
        }
        const message = await Message.create({
            Uuid: crypto.randomUUID(),
            Title,
            Text
        }, { transaction: t })
        await Reply.create({
            Uuid: crypto.randomUUID(),
            AuthorUuid: user.Uuid,
            LastEditorUuid: null,
            MessageUuid: message.Uuid,
            ReplyingTo,
            ReplyingToUuid,
            PostUuid: postId,
        }, { transaction: t })
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if(!file) continue
                const filePath = file.path
                await Attachment.create({
                    AttachmentUrl: filePath,
                    UserUuid: user.Uuid,
                    MessageUuid: message.Uuid,
                }, { transaction: t })
            }
        }
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if (!file) continue
                const filePath = file.path
                await unlink(filePath)
            }
        }
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const updateReply = async (req, res, next) => {
    if (!req.params.id || !req.params.replyId) return next(new HttpException(400, 'Missing ID in request parameter'))
    if (!req.body) return next(new HttpException(400, 'Request body not found'))
    const { id, replyId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const { Title, Text } = req.body
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) throw new Error('User not found')
        const reply = await Reply.findOne({
            where: {
                Uuid: replyId,
            }, transaction: t
        })
        if(!reply) throw new Error('Reply not found')
        await Message.update({
            ...Title && {Title},
            ...Text && {Text},
        }, { 
            where: {
                Uuid: reply.MessageUuid,
            }, transaction: t
        })
        await reply.setReplyLastEditor(user.Uuid, { transaction: t })
        if (req.files && req.files.length) {
            const message = await reply.getMessage({ transaction: t })
            const attachments = await message.countAttachments({ transaction: t })
            if (attachments >= D_DEFAULT_MAX_ATTACHMENTS) throw new Error('Message has too many attachments')
            const totalAttachments = req.files.length + attachments
            if (totalAttachments > D_DEFAULT_MAX_ATTACHMENTS) throw new Error(`Exceeding the maximum allowed attachments by ${totalAttachments - D_DEFAULT_MAX_ATTACHMENTS}`)
            for (const file of req.files) {
                if(!file) continue
                const filePath = file.path
                await Attachment.create({
                    AttachmentUrl: filePath,
                    UserUuid: user.Uuid,
                    MessageUuid: reply.MessageUuid,
                }, { transaction: t })
            }
        }
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        if (req.files && req.files.length) {
            for (const file of req.files) {
                if (!file) continue
                const filePath = file.path
                await unlink(filePath)
            }
        }
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

const deleteReply = async (req, res, next) => {
    if (!req.params.id || !req.params.replyId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, replyId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    const t = await sequelize.transaction()
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }, transaction: t
        })
        if (!user) throw new Error('User not found')
        const reply = await Reply.findOne({
            where: {
                Uuid: replyId,
            }, transaction: t
        })
        if(!reply) throw new Error('Reply not found')
        const otherReplies = await Reply.findAll({
            where: {
                ReplyingTo: 'Reply',
                ReplyingToUuid: replyId,
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
                MessageUuid: reply.MessageUuid,
            }, transaction: t
        })
        if (attachments.length) {
            for (const attachment of attachments) {
                await attachment.destroy({ transaction: t })
                await unlink(attachment.AttachmentUrl)
            }
        }
        await Message.destroy({ where: { Uuid: reply.MessageUuid }, transaction: t })
        const result = await t.commit()
        return res.status(200).json(result)
    } catch(e) {
        await t.rollback()
        return next(new HttpException(500, e))
    }
}

export {
    getReplies,
    createReply,
    updateReply,
    deleteReply,
}

// User Grant

const getRoles = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    //if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const roles = await user.getRoles()
        return res.status(200).json(roles)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const createRole = async (req, res, next) => {
    if (!req.params.id || !req.params.roleId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, roleId } = req.params
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        if (await user.hasRole(roleId)) return next(new HttpException(400, 'User role exists'))
        const result = await user.addRole(roleId)
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

const deleteRole = async (req, res, next) => {
    if (!req.params.id || !req.params.roleId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, roleId } = req.params
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        if (!await user.hasRole(roleId)) return next(new HttpException(400, 'User role does not exist already'))
        const result = await user.removeRole(roleId)
        return res.status(200).json(result)
    } catch (e) {
        return next(new HttpException(500, e))
    }
}

export {
    getRoles,
    createRole,
    deleteRole,
}

// User Engagement

const getReactions = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const engagement = await Engagement.findAll({
            where: {
                UserUuid: id,
            }
        })
        return res.status(200).json(engagement)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createReaction = async (req, res, next) => {
    if (!req.params.id || !req.params.reactionId || !req.params.messageId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, reactionId, messageId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const hasMessageReaction = await Engagement.findOne({
            where: {
                UserUuid: id,
                MessageUuid: messageId,
            }
        })
        if (hasMessageReaction) return next(new HttpException(400, 'User message reaction already exists'))
        const result = await Engagement.create({
            UserUuid: id,
            ReactionUuid: reactionId,
            MessageUuid: messageId,
        })
        return res.status(200).json(result)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteReaction = async (req, res, next) => {
    if (!req.params.id || !req.params.reactionId || !req.params.messageId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, reactionId, messageId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const hasMessageReaction = await Engagement.findOne({
            where: {
                UserUuid: id,
                MessageUuid: messageId,
            }
        })
        if (!hasMessageReaction) return next(new HttpException(400, 'User message reaction not found'))
        const result = await Engagement.destroy({
            UserUuid: id,
            ReactionUuid: reactionId,
            MessageUuid: messageId,
        })
        return res.status(200).json(result)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getReactions,
    createReaction,
    deleteReaction,
}

// User Favorite

const getTags = async (req, res, next) => {
    if (!req.params.id) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const favorite = await Favorite.findAll({
            where: {
                UserUuid: id,
            }
        })
        return res.status(200).json(favorite)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const createTag = async (req, res, next) => {
    if (!req.params.id || !req.params.tagId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, tagId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const hasTag = await User.hasTag(tagId)
        if (hasTag) return next(new HttpException(400, 'User tag already exists'))
        const addTag = await User.addTag(tagId)
        return res.status(200).json(addTag)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

const deleteTag = async (req, res, next) => {
    if (!req.params.id || !req.params.tagId) return next(new HttpException(400, 'Missing ID in request parameter'))
    const { id, tagId } = req.params
    if (!req.superAccess && req.decodedJWTPayload.uuid !== id) return next(new HttpException(403, 'You do not have permission to update other users data'))
    try {
        const user = await User.findOne({
            where: {
                Uuid: id,
            }
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const hasTag = await User.hasTag(tagId)
        if (!hasTag) return next(new HttpException(400, 'User tag not found'))
        const removeTag = await User.removeTag(tagId)
        return res.status(200).json(removeTag)
    } catch(e) {
        return next(new HttpException(500, e))
    }
}

export {
    getTags,
    createTag,
    deleteTag,
}