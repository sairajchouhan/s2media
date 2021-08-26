import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { allPosts, createPost, deletePost, getPostById, updatePost } from '../handlers/postHandler'
import auth from '../middlewares/auth'
import { singleImageUploadMiddleware } from '../middlewares/singleImageUpload'

const router = Router()

router.get('/', [query('userId').optional().trim(), query('like').optional().toBoolean()], ash(allPosts))

// Post CRUD
router.post('/', auth, singleImageUploadMiddleware, [body('caption').optional().trim().escape()], ash(createPost))
router.get('/:postId', [param('postId').not().isEmpty()], ash(getPostById))
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
router.delete('/:postId', auth, [param('postId').not().isEmpty()], ash(deletePost))

export default router
