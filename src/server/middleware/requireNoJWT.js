import dotenv from 'dotenv'
import verifyJWT from '../utils/verifyJWT.js'
import HttpException from '../utils/HttpException.js'
import jwt from 'jsonwebtoken'

dotenv.config()

const requireNoJWT = (req, _res, next) => {
    const token = req.signedCookies.token
    if (token && token !== 'undefined') return next(new HttpException(403, 'User already logged in'))
    next()
}

export default requireNoJWT