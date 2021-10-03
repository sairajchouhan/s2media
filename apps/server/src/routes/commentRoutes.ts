import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { createComment, deleteComment, editComment, getCommentsOfPost, getOneComment } from '../handlers/commentHandler'
import auth from '../middlewares/auth'
import follow from '../middlewares/follow'
import validate from '../middlewares/validate'

const router = Router()

router.get('/:postId', auth, [param('postId').exists().trim().escape()], validate, follow, ash(getCommentsOfPost))

router.post(
  '/:postId',
  auth,
  [
    param('postId').notEmpty().trim().escape(),
    body('commentText').trim().escape().notEmpty(),
    query('cursor').optional().trim().escape(),
  ],
  validate,
  follow,
  ash(createComment)
)

router.get(
  '/:postId/:commentId',
  auth,
  [param('postId').not().isEmpty(), param('commentId').not().isEmpty()],
  validate,
  follow,
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
