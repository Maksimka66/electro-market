import { Router } from 'express'
import { CustomError } from '../../errorHandlers/apiErrors.js'
import multer from 'multer'
import { createAttachment } from './attachment.service.js'

const upload = multer({ dest: 'uploads/' })
const router = new Router()

router.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res, next) => {
    try {
        const files = Object.values(req.files ?? {}).flat()

        const result = await Promise.all(
            files.map(async (file) => {
                return await createAttachment(file)
            })
        )

        return res.status(201).json(result)
    } catch (e) {
        console.log(e)
        next(CustomError.badRequest(e.message))
    }
})

export default router

