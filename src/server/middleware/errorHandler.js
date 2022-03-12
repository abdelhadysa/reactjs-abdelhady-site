/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

// Ref: https://scoutapm.com/blog/express-error-handling

module.exports = function errorHandler(err, req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.error('\x1b[31m', err)
    console.log('\x1b[31m', `URL: ${req.originalUrl}`)
    console.log('\x1b[31m', `IP: ${ip}`)
    next(err)
}