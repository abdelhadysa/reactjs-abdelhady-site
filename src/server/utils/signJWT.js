import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const signJWT = (data = {}) => {
    const jwtSecret = process.env.JWT_SECRET
    return new Promise((res, rej) => {
        jwt.sign(data, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: String(process.env.JWT_EXPIRESIN) + ' seconds',
        }, (err, token) => {
            if (err) return rej(err)
            res(token)
        })
    })
}

export default signJWT