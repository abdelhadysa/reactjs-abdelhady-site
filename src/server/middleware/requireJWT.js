/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

import dotenv from 'dotenv'
import verifyJWT from '../utils/verifyJWT'
import HttpException from '../utils/HttpException'
import jwt from 'jsonwebtoken'

dotenv.config()

const requireJWT = (req, _res, next) => {
    const token = req.signedCookies.token
    if (!token || token === 'undefined') return next(new HttpException(401, 'Access to restricted resource without token'))
    verifyJWT(token)
    .then((_decoded) => {
        req.jwtToken = token
        req.decodedJWTPayload = _decoded
        next()
    })
    .catch((e) => next(new HttpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e)))
}

export default requireJWT