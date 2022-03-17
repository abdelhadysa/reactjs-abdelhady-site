/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as roleController from '../controllers/roleController'

const roleRouter = express.Router()

roleRouter.post('/', roleController.createOne)
roleRouter.get('/:id', roleController.getOne)
roleRouter.get('/', roleController.getAll)
roleRouter.put('/:id', roleController.updateOne)
roleRouter.delete('/:id', roleController.deleteOne)

export default roleRouter