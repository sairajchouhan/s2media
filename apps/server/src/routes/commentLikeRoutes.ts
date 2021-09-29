import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeOrUnlikeComment } from '../handlers/commentReplyLikeHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post('/:commentId', auth, [param('commentId').exists().trim().escape()], validate, ash(likeOrUnlikeComment))

export default router
