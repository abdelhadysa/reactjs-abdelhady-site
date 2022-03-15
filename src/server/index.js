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

/* SSR */

import App from '../../src/client/components/App'

/* Routes */

import apiRouter from './routes/apiRouter'

/* Middleware */

import errorHandler from './middleware/errorHandler'
import errorResponder from './middleware/errorResponder'

/* Errors */

import httpException from './utils/httpException'

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

/* Create App Instance */

const app = express()

app
    .use(morgan('common'))
    .use(helmet())
    .use(cors(corsOptions))
    .use(limiter)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.resolve('dist')))
    .use(device.capture())
    .use('/api', apiRouter)
    .get('*', (_req, res, next) => {
        fs.readFile(path.resolve('dist/index.html'), "utf8", (err, data) => {
            if (err) return next(new httpException(500, err))
            return res.status(200).send(data.replace('<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`))
        })
    })
    .use(errorHandler)
    .use(errorResponder)

// Connect to the database then start application
sequelize.authenticate().then(async () => {
    app.listen(process.env.EXPRESS_PORT, () => {
        console.log('\x1b[33m%s\x1b[0m', '|=========================================================|')
        console.log('\x1b[30m%s\x1b[0m', `|==================[${process.env.WEBSITE_NAME}]==================|`)
        console.log('\x1b[36m%s\x1b[0m', `|====================[localhost: ${process.env.EXPRESS_PORT}]====================|`)
        console.log('\x1b[33m%s\x1b[0m', '|=========================================================|')
    })
})