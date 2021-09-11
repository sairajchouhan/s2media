import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeOrUnlikeReply } from '../handlers/commentReplyLikeHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post('/:replyId', auth, [param('replyId').exists().trim().escape()], validate, ash(likeOrUnlikeReply))

export default router
