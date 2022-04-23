import dotenv from 'dotenv'
import AccessToken from '../utils/AccessToken.js'
import HttpException from '../utils/HttpException.js'
import jwt from 'jsonwebtoken'

dotenv.config()

const requireJWT = (req, _res, next) => {
    const token = req.signedCookies.token
    if (!token || token === 'undefined') return next(new HttpException(401, 'Access to restricted resource without token'))
    const accessToken = new AccessToken({})
    accessToken.verify({ token, decode: true })
    .then((_decoded) => {
        req.jwtToken = token
        req.decodedJWTPayload = _decoded
        next()
    })
    .catch((e) => next(new HttpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e)))
}

export default requireJWT