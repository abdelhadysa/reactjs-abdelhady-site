/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

const path = require('path')
const express = require('express')
import * as attachmentController from '../controllers/attachmentController'
import requirePerm from '../middleware/requirePerm'
import { D_ATTACHMENT_PERM, D_DEFAULT_ATTACHMENTS_PATH } from '../utils/defaults'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: path.resolve(D_DEFAULT_ATTACHMENTS_PATH),
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
    }
})
  
const upload = multer({ storage: storage, fileFilter: function fileFilter (req, file, cb) {
    if (file.size > 8000000) return cb(null, false)
    const ext = file.originalname.split('.')[1]
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'pdf':
        case 'txt':
        case 'md': return cb(null, true)
        default: return cb(null, false)
    }
} })

const attachmentRouter = express.Router()

attachmentRouter.get('/', [requirePerm(D_ATTACHMENT_PERM.GET_ALL), attachmentController.getAll])
attachmentRouter.get('/:id', [requirePerm(D_ATTACHMENT_PERM.GET), attachmentController.getOne])
attachmentRouter.post('/', [requirePerm(D_ATTACHMENT_PERM.CREATE), upload.single('attachment'), attachmentController.createOne])
attachmentRouter.put('/:id', [requirePerm(D_ATTACHMENT_PERM.UPDATE), upload.single('attachment'), attachmentController.updateOne])
attachmentRouter.delete('/:id', [requirePerm(D_ATTACHMENT_PERM.DELETE), attachmentController.deleteOne])

export default attachmentRouter