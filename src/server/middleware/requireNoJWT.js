import HttpException from '../utils/HttpException.js'

const requireNoJWT = (req, _res, next) => {
    const token = req.signedCookies.token
    if (token && token !== 'undefined') return next(new HttpException(403, 'User already logged in'))
    next()
}

export default requireNoJWT