import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { saveAndUnsavePost } from '../handlers/saveHandler'
import auth from '../middlewares/auth'

const router = Router()

router.post('/:postId', auth, [param('postId').not().isEmpty()], ash(saveAndUnsavePost))

export default router
