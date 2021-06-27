import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'

const router = Router()
import { createComment, editComment, deleteComment } from '../handlers/commentHandler'
import auth from '../middlewares/auth'

router.post(
  '/:postId',
  auth,
  [param('postId').isInt().toInt(), body('body').trim().escape().notEmpty()],
  ash(createComment)
)

router.put(
  '/:postId/:commentId',
  [param('postId').isInt().toInt(), param('commentId').isInt().toInt(), body('body').trim().escape().notEmpty()],
  auth,
  ash(editComment)
)

router.delete(
  '/:postId/:commentId',
  [param('postId').isInt().toInt(), param('commentId').isInt().toInt()],
  auth,
  ash(deleteComment)
)

export default router
