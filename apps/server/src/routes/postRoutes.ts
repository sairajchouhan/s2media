import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { allPosts, createPost, deletePost, getPostById, updatePost } from '../handlers/postHandler'
import auth from '../middlewares/auth'
import { singleImageUploadMiddleware } from '../middlewares/singleImageUpload'
import validate from '../middlewares/validate'

const router = Router()

router.get(
  '/',
  [
    query('username').optional().trim().escape(),
    query('like').optional().toBoolean(),
    query('save').optional().toBoolean(),
  ],
  validate,
  ash(allPosts)
)

// Post CRUD
router.post(
  '/',
  auth,
  singleImageUploadMiddleware,
  [body('caption').optional().trim().escape()],
  validate,
  ash(createPost)
)

router.get('/:postId', [param('postId').not().isEmpty()], validate, ash(getPostById))
router.put(
  '/:postId',
  auth,
  [
    param('postId').isInt().toInt(),
    body('url').trim().notEmpty().optional(),
    body('caption').trim().escape().notEmpty().optional(),
  ],
  validate,
  ash(updatePost)
)
router.delete('/:postId', auth, [param('postId').not().isEmpty()], validate, ash(deletePost))

export default router
