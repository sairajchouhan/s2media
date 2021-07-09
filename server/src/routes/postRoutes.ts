import { Request, Response, Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { cloudinaryUpload } from '../config/cloudinary'
import { formatBufferTo64 } from '../config/data-uri'
import { allPosts, createPost, deletePost, updatePost } from '../handlers/postHandler'
import auth from '../middlewares/auth'
import { singleImageUploadMiddleware } from '../middlewares/singleImageUpload'

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

router.post('/:postId/upload', singleImageUploadMiddleware, async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error('file not found; err in /:postId/upload')
  }
  try {
    const base64file = formatBufferTo64(req.file)
    const result = await cloudinaryUpload(base64file.content as string)

    res.json({
      result,
    })
  } catch (err) {
    console.log(err)
    console.log('err in /upload')
  }
})

export default router
