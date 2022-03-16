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
import httpException from '../utils/httpException'

dotenv.config()

const refreshJWT = (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) return next()
    verifyJWT(token)
    .then((decoded) => {
        const unixTimestamp = Math.floor(Date.now() / 1000)
        if (decoded.exp - unixTimestamp > 60) {
            return next(new httpException(400, e))
        }
        const { username } = decoded
        signJWT({ username })
    })
    .then((token) => {
        res.cookie('token', token, { maxAge: process.env.COOKIE_MAXAGE * 1000, signed: true })
        next()
    })
    .catch((e) => next(new httpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e)))
}

export default refreshJWT