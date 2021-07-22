import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { likeAndUnlikePost } from '../handlers/likeHandler'
import auth from '../middlewares/auth'

const router = Router()

router.post('/:postId', auth, [param('postId').not().isEmpty()], ash(likeAndUnlikePost))

export default router
