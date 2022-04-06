/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

// Ref: https://www.sohamkamani.com/nodejs/jwt-authentication/#:~:text=Verifying%20a%20JWT,the%20JWT%20is%20considered%20valid.

import dotenv from 'dotenv'
import verifyJWT from '../utils/verifyJWT'
import signJWT from '../utils/signJWT'
import HttpException from '../utils/HttpException'
import jwt from 'jsonwebtoken'
import models, { sequelize } from 'Database/sequelize-models'

dotenv.config()
const { User } = models

/*
 * Logic:
 * JWT token is created and is set to expire in 300 seconds
 * JWT token is stored in a cookie that is set to expire in 300 seconds
 * JWT token is checked on every API call for nearing expiry
 * If the JWT token is expiring in 60 seconds, generate a new token
 * Place the new token in a new cookie that will then expire in 300 seconds
 */ 

const refreshJWT = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token || token === 'undefined') return next() // If token cookie doesn't exist, skip refresh process
    try {
        const decoded = await verifyJWT(token) // Verify and decode the JWT token
        const unixTimestamp = Math.floor(Date.now() / 1000)
        // console.log(decoded.exp, unixTimestamp)

        // Update User Meta Data
        User.update({
            IpAddress: req.ip,
            Device: req.device.type.charAt(0).toUpperCase() + req.device.type.slice(1),
            LastVisit: new Date(),
        }, {
            where: {
                Uuid: decoded.uuid,
            }
        })

        // Renewal Code
        if (decoded.exp - unixTimestamp > process.env.JWT_REFRESHIN) return next()
        const { uuid } = decoded
        const newToken = await signJWT({ uuid }) // Renew token
        res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true }) // Renew cookie
        return next()
    } catch (e) { 
        res.clearCookie('token')
        return next(new HttpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e))
    }
}

export default refreshJWT