/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')

import models from 'Database/sequelize-models'
import httpException from '../utils/httpException'

const { User, Role, Permission, RolePermission } = models

const requirePerm = async (req, res, next) => {
    if (!req.jwtToken || !req.decodedJWTPayload) return next(new httpException(401, 'Missing payload data'))
    const { decodedJWTPayload, permNeeded } = req
    try {
        const user = await User.findOne({
            where: {
                Username: decodedJWTPayload.username,
            },
        })
        if (!user) return next(new httpException(400, 'User no longer exists'))
        const permission = await Permission.findOne({
            where: {
                Name: permNeeded,
            },
        })
        if (!permission) return next(new httpException(404, 'Permission not found'))
        const userRolePermissions = await user.getRolePermissions()
        for (const userRolePermission of userRolePermissions) {
            if (userRolePermission.PermissionUuid === permission.Uuid) return next()
        }
        next(new httpException(401, 'Unauthorized user'))
    } catch (e) {
        return next(new httpException(500, e))
    }
}

export default requirePerm