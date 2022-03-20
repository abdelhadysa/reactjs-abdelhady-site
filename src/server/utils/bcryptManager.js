import bcrypt from 'bcrypt'

const saltRounds = 10

const hashPass = (str) => new Promise((res, rej) => {
    bcrypt.hash(str, saltRounds, (err, hash) => err ? rej(err) : res(hash))
})

const tryPass = (str, hash) => new Promise((res, rej) => {
    bcrypt.compare(str, hash, (err, result) => err ? rej(err) : res(result))
})

export {
    hashPass,
    tryPass,
}