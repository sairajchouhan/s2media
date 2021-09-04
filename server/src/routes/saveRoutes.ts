import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { saveAndUnsavePost } from '../handlers/saveHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post('/:postId', auth, [param('postId').not().isEmpty()], validate, ash(saveAndUnsavePost))

export default router
