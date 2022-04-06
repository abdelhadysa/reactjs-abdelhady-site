/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const device = require('express-device')
const fs = require('fs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const cookieParser = require('cookie-parser')
const rfs = require('rotating-file-stream')

/* SSR */

import App from '../../src/client/components/App'

/* Routes */

import apiRouter from './routes/apiRouter'

/* Middleware */

import errorHandler from './middleware/errorHandler'
import errorResponder from './middleware/errorResponder'

/* Errors */

import HttpException from './utils/HttpException'

/* ANSI Color Codes */

import * as ansiEscapeColor from './utils/ansiEscapeColor'

/* Load Env */

dotenv.config()

/* PG Sequelize */
// Ref: https://www.robinwieruch.de/postgres-express-setup-tutorial/

import { sequelize } from 'Database/sequelize-models'

/* Whitelist */

// Ref: https://blog.logrocket.com/express-middleware-a-complete-guide/

const whitelist = [process.env.FRONTEND_SERVER]
const corsOptions = {
    origin: (origin, callback = () => {}) => {
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true)
        } else {
            callback(new HttpException(403, 'Origin not whitelisted'))
        }
    },
    optionsSuccessStatus: 200, // Ref: https://expressjs.com/en/resources/middleware/cors.html
}

/* Rate Limited */

// Ref: https://blog.logrocket.com/express-middleware-a-complete-guide/

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Client sent too many requests. Please try again later.',
})

// Rotating log

const logStream = rfs.createStream('api.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

/* Create App Instance */

const app = express()

app
    .use(morgan('common', { stream: logStream }))
    .use(helmet())
    .use(cors(corsOptions))
    .use(limiter)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser(process.env.COOKIEPARSER_SECRET, {
        httpOnly: true,
        maxAge: process.env.COOKIE_MAXAGE,
        sameSite: true,
    }))
    .use(express.static(path.resolve('dist')))
    .use(device.capture())
    .use('/api', apiRouter)
    .get('*', (_req, res, next) => {
        fs.readFile(path.resolve('dist/index.html'), "utf8", (err, data) => {
            if (err) return next(new HttpException(500, err))
            return res.status(200).send(data.replace('<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`))
        })
    })
    .use(errorHandler)
    .use(errorResponder)

// Connect to the database then start application
sequelize.authenticate().then(async () => {
    console.log(ansiEscapeColor.FgWhite)
    console.log(ansiEscapeColor.FgWhite)
    console.log(ansiEscapeColor.FgMagenta, 'Sequelize authentication successful.')
    app.listen(process.env.EXPRESS_PORT, () => {
        console.log(ansiEscapeColor.FgMagenta, `${process.env.WEBSITE_NAME} Listening on ${process.env.EXPRESS_PORT}`)
        console.log(ansiEscapeColor.FgWhite)
        console.log(ansiEscapeColor.FgWhite)
    })
})