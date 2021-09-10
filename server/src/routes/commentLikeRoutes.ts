import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeComment } from '../handlers/commentLikeHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post('/:commentId', auth, [param('commentId').exists().trim().escape()], validate, ash(likeComment))

export default router
