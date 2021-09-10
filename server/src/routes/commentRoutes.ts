import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { createComment, deleteComment, editComment, getCommentsOfPost, getOneComment } from '../handlers/commentHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.get('/:postId', auth, ash(getCommentsOfPost))

router.post(
  '/:postId',
  auth,
  [
    param('postId').notEmpty(),
    body('commentText').trim().escape().notEmpty(),
    query('cursor').optional().trim().escape(),
  ],
  validate,
  ash(createComment)
)

router.get(
  '/:postId/:commentId',
  auth,
  [param('postId').not().isEmpty(), param('commentId').not().isEmpty()],
  validate,
  ash(getOneComment)
)

router.put(
  '/:postId/:commentId',
  auth,
  [
    param('postId').notEmpty().trim().escape(),
    param('commentId').notEmpty().trim().escape(),
    body('commentText').trim().escape().notEmpty(),
  ],
  validate,
  ash(editComment)
)

router.delete(
  '/:postId/:commentId',
  auth,
  [param('postId').notEmpty().trim().escape(), param('commentId').notEmpty().trim().escape()],
  validate,
  ash(deleteComment)
)

export default router
