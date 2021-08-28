import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { createReplyToComment } from '../handlers/replyHandlers'
import auth from '../middlewares/auth'

const router = Router()

router.post(
  '/:postId/:commentId',
  auth,
  [
    param('postId').not().isEmpty(),
    param('commentId').not().isEmpty(),
    body('replyText').trim().escape().not().isEmpty(),
  ],
  ash(createReplyToComment)
)

export default router
