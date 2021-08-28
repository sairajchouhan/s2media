import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { createReplyToComment } from '../handlers/replyHandlers'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post(
  '/:postId/:commentId',
  auth,
  [
    param('postId').not().isEmpty(),
    param('commentId').not().isEmpty(),
    body('replyText').trim().escape().not().isEmpty(),
    body('repliedToUserUid').trim().escape().optional(),
  ],
  validate,
  ash(createReplyToComment)
)

export default router
