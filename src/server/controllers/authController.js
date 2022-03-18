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
//import isUuid from '../utils/isUuid'

dotenv.config()

const { User, Role } = models

const register = async (req, res, next) => {
    try {
        const { Username } = req.body
        if (!Username) next(new httpException(400, 'No username specified'))
        const user = await User.scope('hideSensitive').create({
            Username: Username,
        })
        const userRole = await Role.scope('hideSensitive').findOne({
            where: {
                Name: {
                    [Op.eq]: 'User'
                },
            },
        })
        await user.addRoles(userRole)
        signJWT({ username: Username })
        .then((newToken) => {
            res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
            res.status(200).json(user)
        })
        .catch((e) => next(new httpException(500, e)))
    } catch(e) {
        next(new httpException(500, e))
    }
}

const login = async (req, res, next) => {
    try {
        const { Username } = req.body
        if (!Username) next(new httpException(400, 'No username specified'))
        const user = await User.scope('hideSensitive').findOne({
            where: {
                Username: {
                    [Op.eq]: Username,
                },
            },
        })
        if (!user) return next(new httpException(404, 'User not found'))
        signJWT({ username: Username })
        .then((newToken) => {
            res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true })
            res.status(200).json(user)
        })
        .catch((e) => next(new httpException(500, e)))
    } catch(e) {
        next(new httpException(500, e))
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.status(200).send('Logout request successful').end()
    } catch(e) {
        next(new httpException(500, e))
    }
}


export {
    register,
    login,
    logout,
}