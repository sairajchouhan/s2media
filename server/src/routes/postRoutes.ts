import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { allPosts, createPost, deletePost, updatePost } from '../handlers/postHandler'
import auth from '../middlewares/auth'
import { singleImageUploadMiddleware } from '../middlewares/singleImageUpload'

const router = Router()

router.post('/', auth, singleImageUploadMiddleware, [body('caption').optional().trim().escape()], ash(createPost))
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

export default router
