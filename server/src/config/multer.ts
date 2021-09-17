import { Request } from 'express'
import multer from 'multer'
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']
const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (_: Request, file: Express.Multer.File, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
})
