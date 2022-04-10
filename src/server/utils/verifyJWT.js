import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const verifyJWT = (token = null) => {
    const jwtSecret = process.env.JWT_SECRET
    return new Promise((res, rej) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return rej(err)
            res(decoded)
        })
    })
}

export default verifyJWT