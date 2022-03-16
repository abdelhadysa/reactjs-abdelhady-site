/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

import dotenv from 'dotenv'
import verifyJWT from '../utils/verifyJWT'
import httpException from '../utils/httpException'

dotenv.config()

const requireJWT = (req, _res, next) => {
    const token = (req.signedCookies && req.signedCookies.token) ? req.signedCookies.token
        : (req.headers('Authorization').split(' ')[0] === 'Bearer') ? req.headers('Authorization').split(' ')[1] : undefined
    if (!token) return next(new httpException(401, 'Access to restricted resource without token'))
    verifyJWT(token)
    .then((_decoded) => {
        next()
    })
    .catch((e) => next(new httpException((e instanceof jwt.JsonWebTokenError) ? 401 : 400, e)))
}

export default requireJWT