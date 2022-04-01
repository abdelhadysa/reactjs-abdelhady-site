/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as reactionController from '../controllers/reactionController'
import requirePerm from '../middleware/requirePerm'
import { D_REACTION_PERM } from '../utils/defaults'

const reactionRouter = express.Router()

reactionRouter.get('/', [requirePerm(D_REACTION_PERM.GET_ALL), reactionController.getAll])
reactionRouter.get('/:id', [requirePerm(D_REACTION_PERM.GET), reactionController.getOne])
reactionRouter.post('/', [requirePerm(D_REACTION_PERM.CREATE), reactionController.createOne])
reactionRouter.put('/:id', [requirePerm(D_REACTION_PERM.UPDATE), reactionController.updateOne])
reactionRouter.delete('/:id', [requirePerm(D_REACTION_PERM.DELETE), reactionController.deleteOne])
reactionRouter.get('/:id/message', [requirePerm(D_REACTION_PERM.GET_MESSAGES), reactionController.getMessages])

export default reactionRouter