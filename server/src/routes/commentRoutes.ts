import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { createComment, deleteComment, editComment } from '../handlers/commentHandler'
import auth from '../middlewares/auth'

const router = Router()

router.post('/:postId', auth, [param('postId').notEmpty(), body('body').trim().escape().notEmpty()], ash(createComment))

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
