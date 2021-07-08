import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response, Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import multer from 'multer'
import { allPosts, createPost, deletePost, updatePost } from '../handlers/postHandler'
import auth from '../middlewares/auth'

cloudinary.config({
  cloud_name: 'sairaj',
  api_key: '974125293171318',
  api_secret: 'oFVb3qnf-KRXMuzG5Z15vTfpTdQ',
  secure: process.env.NODE_ENV === 'production' ? true : false,
})

const cloudinaryUpload = (file: any) => cloudinary.uploader.upload(file)

const path = require('path')
const DatauriParser = require('datauri/parser')
const parser = new DatauriParser()

const router = Router()

router.post(
  '/',
  auth,
  [body('url', 'url is required').not().isEmpty().trim(), body('caption').optional().trim().escape()],
  ash(createPost)
)
router.get('/', ash(allPosts))
router.put(
  '/:postId',
  auth,
  [
    param('postId').isInt().toInt(),
    body('url').trim().notEmpty().optional(),
    body('caption').trim().escape().notEmpty().optional(),
  ],
  ash(updatePost)
)
router.delete('/:postId', auth, [param('postId').isInt().toInt()], ash(deletePost))

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg']

const formatBufferTo64 = (file: any) => parser.format(path.extname(file.originalname).toString(), file.buffer)

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: function (_req: Request, file: any, cb: any) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Not supported file type!'), false)
    }
  },
})

const singleUpload = upload.single('image')
const singleUploadCtrl = (req: Request, res: Response, next: NextFunction) => {
  singleUpload(req, res, (error: any) => {
    if (error) {
      return res.status(422).send({ message: 'Image upload fail!' })
    }
    return next()
  })
}

router.post('/upload', singleUploadCtrl, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('Image is not presented!')
    }
    const file64 = formatBufferTo64(req.file)
    const uploadResult = await cloudinaryUpload(file64.content)

    return res.json({ cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url })
  } catch (e) {
    return res.status(422).send({ message: e.message })
  }
})

export default router
