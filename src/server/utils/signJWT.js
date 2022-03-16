/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const signJWT = (data = {}) => {
    const jwtSecret = process.env.JWT_SECRET
    return new Promise((res, rej) => {
        jwt.sign(data, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: process.env.COOKIE_MAXAGE,
        }, (err, token) => {
            if (err) return rej(err)
            res(token)
        })
    })
}

export default signJWT