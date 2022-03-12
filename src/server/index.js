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

/* Routes */

const apiRouter = require('./routes/apiRouter')

/* Middleware */

const errorHandler = require('./middleware/errorHandler')
const errorResponder = require('./middleware/errorResponder')

/* Errors */

const httpException = require('./utils/httpException')

/* Load Env */

dotenv.config()

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
    .use(express.static('dist'))
    .use(device.capture())
    .use('/api', apiRouter)
    .get('*', (_req, res) => res.status(200).sendFile(path.join(__dirname, '../../../dist/index.html')))
    .use(errorHandler)
    .use(errorResponder)
    .listen(process.env.EXPRESS_PORT, () => {
        console.log('|==========================================================|')
        console.log('\x1b[33m%s\x1b[0m', `|============[${process.env.WEBSITE_NAME}]============|`)
        console.log('\x1b[33m%s\x1b[0m', `|=====================[localhost:${process.env.EXPRESS_PORT}]=====================|`)
        console.log('|==========================================================|')
    })