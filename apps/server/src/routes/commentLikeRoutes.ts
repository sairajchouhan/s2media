import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeOrUnlikeComment } from '../handlers/commentReplyLikeHandler'
import auth from '../middlewares/auth'
import follow from '../middlewares/follow'
import validate from '../middlewares/validate'

const router = Router()

router.post(
  '/:postId/:commentId',
  auth,
  [param('postId').exists().trim().escape(), param('commentId').exists().trim().escape()],
  validate,
  follow,
  ash(likeOrUnlikeComment)
)

export default router
