/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

/* ANSI Color Codes */

import * as ansiEscapeColor from '../utils/ansiEscapeColor'

// Ref: https://scoutapm.com/blog/express-error-handling

export default function errorHandler(err, req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.group(err.name)
        console.log(ansiEscapeColor.FgRed, err)
        console.log(ansiEscapeColor.FgRed, `URL: ${req.originalUrl}`)
        console.log(ansiEscapeColor.FgRed, `IP: ${ip}`)
        console.log(ansiEscapeColor.FgWhite)
    console.groupEnd()
    next(err)
}