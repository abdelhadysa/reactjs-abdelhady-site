// Ref: https://www.sohamkamani.com/nodejs/jwt-authentication/#:~:text=Verifying%20a%20JWT,the%20JWT%20is%20considered%20valid.

import dotenv from 'dotenv'
import { accessToken } from '../index.js'
import HttpException from '../utils/HttpException.js'
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
        const decoded = await accessToken.verify({ token, decode: true }) // Verify and decode the JWT token
        const timestamp = Math.floor(new Date().getTime() / 1000)

        // Verify User
        const user = await User.findOne({
            where: {
                Uuid: decoded.uuid,
            },
        })
        if (!user) throw new Error('User not found')

        // Update User Meta Data
        await user.update({
            IpAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            Device: req.device.type.charAt(0).toUpperCase() + req.device.type.slice(1),
            LastVisit: new Date(),
        })

        // Renewal Code
        if (decoded.refreshAfter > timestamp) return next()
        const newToken = await accessToken.refresh(token) // Renew token
        res.cookie('token', newToken, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true, httpOnly: true, sameSite: true }) // Renew cookie
        return next()
    } catch (e) { 
        res.clearCookie('token')
        return next(new HttpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e))
    }
}

export default refreshJWT