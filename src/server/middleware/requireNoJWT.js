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

const requireNoJWT = (req, _res, next) => {
    const token = req.signedCookies.token
    if (token && token !== 'undefined') return next(new HttpException(403, 'User already logged in'))
    next()
}

export default requireNoJWT