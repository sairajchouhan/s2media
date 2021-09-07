import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { createReplyToComment, deleteReply, editReply, getReplyForComment } from '../handlers/replyHandlers'
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

router.get(
  '/:postId/:commentId',
  auth,
  [
    param('postId').not().isEmpty().trim().escape(),
    param('commentId').not().isEmpty().trim().escape(),
    query('cursor').optional().trim().escape(),
  ],
  validate,
  ash(getReplyForComment)
)

router.put(
  '/:postId/:commentId/:replyId',
  auth,
  [
    param('postId').notEmpty().trim().escape(),
    param('commentId').notEmpty().trim().escape(),
    param('replyId').notEmpty().trim().escape(),
    body('replyText').trim().escape().notEmpty(),
  ],
  validate,
  ash(editReply)
)

router.delete(
  '/:postId/:commentId/:replyId',
  auth,
  [
    param('postId').notEmpty().trim().escape(),
    param('commeneId').notEmpty().trim().escape(),
    param('replyId').notEmpty().trim().escape(),
  ],
  validate,
  ash(deleteReply)
)

export default router
