import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const hashPass = (str) => new Promise((res, rej) => {
    const saltRounds = parseFloat(process.env.SALT_ROUNDS) || 10
    bcrypt.hash(str, saltRounds, (err, hash) => err ? rej(err) : res(hash))
})

const tryPass = (str, hash) => new Promise((res, rej) => {
    bcrypt.compare(str, hash, (err, result) => err ? rej(err) : res(result))
})

export {
    hashPass,
    tryPass,
}