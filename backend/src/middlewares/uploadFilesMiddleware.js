import multer from 'multer'

const upload = multer({
    dest: 'static/'
})

export default upload
