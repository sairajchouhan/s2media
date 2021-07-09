import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { upload } from '../config/multer'
const singleUpload = upload.single('image')

export const singleImageUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(422).send('Image upload fail!')
    } else if (err) {
      return res.status(400).send('someting went wrong')
    }
    next()
  })
}
