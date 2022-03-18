/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import models from 'Database/sequelize-models'
import { Op } from 'sequelize'
import httpException from '../utils/httpException'
import isUuid from '../utils/isUuid'

const { User, Permission } = models

const requirePerm = async (req, res, next, permissionName) => {
    if (!req.jwtToken || !req.decodedJWTPayload) return next(new httpException(401, 'Missing payload data'))
    const { decodedJWTPayload } = req
    try {
        const permission = await Permission.scope('hideSensitive').findOne({
            where: {
                [Op.or]: [ { Name: permissionName }, { Name: 'Full access' } ],
            },
        })
        if (!permission) return next(new httpException(404, 'Permission name not found'))
        const user = await User.scope('hideSensitive').findOne({
            where: {
                Username: {
                    [Op.eq]: decodedJWTPayload.username,
                },    
            },
        })
        const userRoles = await user.getRoles()
        userRoles.forEach(async (role, index) => {
            const roleHasPermission = await role.hasPermissions(permission)
            if (roleHasPermission === true) return next()
            else if (index === (userRoles.length - 1)) return next(new httpException(401, 'Unauthorized access'))
        })
    } catch (e) {
        return next(new httpException(500, e))
    }
}

export default requirePerm