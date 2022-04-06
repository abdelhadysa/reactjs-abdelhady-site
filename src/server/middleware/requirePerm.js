/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import models from 'Database/sequelize-models'
import HttpException from '../utils/HttpException'
import isUuid from '../utils/isUuid'

const { User, Permission, Log } = models

const requirePerm = (permNeeded) => {
    return async (req, res, next) => {
        if (!req.jwtToken || !req.decodedJWTPayload) return next(new HttpException(401, 'Missing payload data'))
        const { decodedJWTPayload } = req
        if (!isUuid(decodedJWTPayload.uuid)) return next(new HttpException(400, 'Corrupted payload data'))
        try {
            const user = await User.findOne({
                where: {
                    Uuid: decodedJWTPayload.uuid,
                },
            })
            if (!user) throw new Error('User does not exist')
            const permission = await Permission.findOne({
                where: {
                    Name: permNeeded,
                },
            })
            if (!permission) throw new Error('Permission does not exist')
            const roles = await user.getRoles()
            if (!roles.length) throw new Error('User roles not found')
            for (const role of roles) {
                if (await role.hasPermission(permission)) {
                    req.authorized = true
                    req.permissionNeeded = permNeeded
                    req.roleOfAuthority = role.Name
                    if (role.Super === true) {
                        req.superAccess = true
                        break
                    }
                    req.superAccess = false
                }
            }
            if (req.authorized === true) {
                const message = `Authorized User ${user.Username} with Role ${req.roleOfAuthority} (Super: ${req.superAccess}) and Permission ${req.permissionNeeded}`
                console.log(message)
                await Log.create({
                    Message: `Requested permission to access ${req.originalUrl}`,
                    UserUuid: user.Uuid,
                    Username: user.Username,
                    Role: req.roleOfAuthority,
                    Super: req.superAccess,
                    Permission: req.permissionNeeded,
                    Level: 'INFO',
                    IpAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                })
                return next()
            } else return next(new HttpException(401, 'User not allowed to access this resource'))
        } catch(e) {
            return next(new HttpException(500, e))
        }
    }
}

export default requirePerm