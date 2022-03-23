/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import dotenv from 'dotenv'
//import verifyJWT from '../utils/verifyJWT'
import signJWT from '../utils/signJWT'
import models from 'Database/sequelize-models'
import { Op } from 'sequelize'
import httpException from '../utils/httpException'
import { hashPass, tryPass } from '../utils/bcryptManager'
//import isUuid from '../utils/isUuid'

dotenv.config()

const { User, Role } = models

const register = async (req, res, next) => {
    try {
        const { Username, Password } = req.body
        if (!Username) return next(new httpException(400, 'No username specified'))
        if (!Password || Password.length < 8 || Password.length > 65) return next(new httpException(400, 'Password should be from 8 to 65 characters'))
        const hashedPass = await hashPass(Password)
        const user = await User.create({
            Username: Username,
            PasswordHash: hashedPass,
        })
        const userRole = await Role.scope('defaultUser').findOne()
        await user.addRolePermission(await userRole.getRolePermissions())
        signJWT({ username: Username })
        .then((newToken) => {
            res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
            res.status(200).json({ success: true })
        })
        .catch((e) => next(new httpException(500, e)))
    } catch(e) {
        next(new httpException(500, e))
    }
}

const login = async (req, res, next) => {
    try {
        const { Username, Password } = req.body
        if (!Username) return next(new httpException(400, 'No username specified'))
        const user = await User.findOne({
            where: {
                Username: {
                    [Op.eq]: Username,
                },
            },
        })
        if (!user) return next(new httpException(404, 'User not found'))
        const passwordHash = user.PasswordHash
        if (!await tryPass(Password, passwordHash)) return next(new httpException(401, 'Bad password'))
        signJWT({ username: Username })
        .then((newToken) => {
            res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
            res.status(200).json({ success: true })
        })
        .catch((e) => next(new httpException(500, e)))
    } catch(e) {
        next(new httpException(500, e))
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