/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as authController from '../controllers/authController'
import requireJWT from '../middleware/requireJWT'
import requireNoJWT from '../middleware/requireNoJWT'

const authRouter = express.Router()

authRouter.post('/register', [requireNoJWT, authController.register])
authRouter.post('/login', [requireNoJWT, authController.login])
authRouter.post('/logout', [requireJWT, authController.logout])

export default authRouter