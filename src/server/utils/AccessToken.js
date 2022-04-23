import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import util from 'util'

dotenv.config()

class AccessToken {
    constructor({ secret = null, expiresIn = null, refreshAfter = null, log = process.env.NODE_ENV === 'development' ? true : false }) {
        this.secret = (secret !== null) ? secret : process.env.JWT_SECRET
        this.expiry = parseFloat((expiresIn !== null) ? expiresIn : process.env.JWT_EXPIRY_SECONDS)
        this.refreshAfter = Math.floor(new Date().getTime() / 1000) + parseFloat((refreshAfter !== null ? refreshAfter : process.env.JWT_REFRESH_AFTER))
        this.log = log
    }
    sign = (data = {}) => new Promise((res, rej) => {
        const { secret, expiry, refreshAfter, log } = this
        if (!secret || typeof secret !== 'string') return rej(new Error('Invalid secret'))
        if (log) {
            console.group('AccessToken: Sign') 
            console.log(`Options: Secret Key: ${secret} Expires After: ${expiry} Refreshes After: ${refreshAfter}`) 
            console.log(`Data: ${util.inspect(data)}`) 
            console.groupEnd()
        }
        jwt.sign({ accessData: { ...data, refreshAfter } }, secret, {
            algorithm: 'HS256',
            expiresIn: expiry,
        }, (err, token) => {
            if (err) return rej(err)
            res(token)
        })
    })
    verify = ({ token = null, decode = true }) => new Promise((res, rej) => {
        const { secret, log } = this
        if (!secret || typeof secret !== 'string') return rej(new Error('Invalid secret'))
        if (!token || typeof token !== 'string') return rej(new Error('Invalid token'))
        if (log) {
            console.group('AccessToken: Verify')
            console.log(`Options: Secret Key: ${secret}`)
            console.log(`Token: ${token} Decode: ${decode}`)
            console.groupEnd()
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return rej(err)
            res(decode === true ? decoded.accessData : true)
        })
    })
    refresh = (token = null) => new Promise((res, rej) => {
        const { secret, log, verify } = this
        if (!secret || typeof secret !== 'string') return rej(new Error('Invalid secret'))
        if (!token || typeof token !== 'string') return rej(new Error('Invalid token'))
        if (log) {
            console.group('AccessToken: Refresh')
            console.log(`Options: Secret Key: ${secret}`)
            console.log(`Token: ${token}`)
            console.groupEnd()
        }
        res(verify({ token, decode: true }))
    }).then((decoded) => new Promise((res, rej) => {
        const { sign } = this
        const timestamp = Math.floor(new Date().getTime() / 1000)
        if (decoded.refreshAfter > timestamp) return rej(new Error(`${Number(decoded.refreshAfter - timestamp)} seconds left to be eligible for AccessToken refresh`))
        res(sign(decoded))
    }))
}

export default AccessToken