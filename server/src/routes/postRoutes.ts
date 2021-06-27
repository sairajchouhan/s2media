import { Router } from 'express'
import { createPost, allPosts, updatePost, deletePost } from '../handlers/postHandler'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'

import auth from '../middlewares/auth'

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

export default router
