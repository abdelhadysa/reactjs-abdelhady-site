import dotenv from 'dotenv'
import accessToken from '../index.js'
import models, { sequelize } from 'Database/sequelize-models'
import { Op } from 'sequelize'
import HttpException from '../utils/HttpException.js'
import { hashPass, tryPass } from '../utils/bcryptManager.js'
//import isUuid from '../utils/isUuid'

dotenv.config()

const { User, Role, Grant } = models

const register = async (req, res, next) => {
    try {
        const { Username, Password, Email } = req.body
        if (!Username || Username.length < 3 || Username.length > 15) return next(new HttpException(400, 'Username should be from 3 to 15 characters'))
        if (!Password || Password.length < 8 || Password.length > 65) return next(new HttpException(400, 'Password should be from 8 to 65 characters'))
        const hashedPass = await hashPass(Password)
        const t = await sequelize.transaction()
        const user = await User.create({
            Username: Username,
            PasswordHash: hashedPass,
            ...Email && {Email},
        }, { transaction: t })
        const userRole = await Role.scope('defaultUser').findOne({ transaction: t })
        await Grant.create({
            UserUuid: user.Uuid,
            RoleUuid: userRole.Uuid,
        }, { transaction: t })
        await t.commit()
        const newToken = await accessToken.sign({ uuid: user.Uuid })
        res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
        res.status(200).json({ success: true })
    } catch(e) {
        await t.rollback()
        next(new HttpException(500, e))
    }
}

const login = async (req, res, next) => {
    try {
        const { Username, Password } = req.body
        if (!Username) return next(new HttpException(400, 'No username specified'))
        if (!Password) return next(new HttpException(400, 'No password specified'))
        const user = await User.findOne({
            where: {
                Username,
            },
        })
        if (!user) return next(new HttpException(404, 'User not found'))
        const passwordHash = user.PasswordHash
        if (!await tryPass(Password, passwordHash)) return next(new HttpException(401, 'Bad password'))
        const newToken = await accessToken.sign({ uuid: user.Uuid })
        res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
        res.status(200).json({ success: true })
    } catch(e) {
        next(new HttpException(500, e))
    }
}

const logout = async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({ success: true })
}


export {
    register,
    login,
    logout,
}