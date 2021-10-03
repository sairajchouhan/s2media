import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeOrUnlikeReply } from '../handlers/commentReplyLikeHandler'
import auth from '../middlewares/auth'
import follow from '../middlewares/follow'
import validate from '../middlewares/validate'

const router = Router()

router.post(
  '/:postId/:replyId',
  auth,
  [param('postId').exists().trim().escape(), param('replyId').exists().trim().escape()],
  validate,
  follow,
  ash(likeOrUnlikeReply)
)

export default router
