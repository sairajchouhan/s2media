import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'

import { followUser } from '../handlers/followHandler'
import auth from '../middlewares/auth'

const router = Router()

router.post('/:userId', auth, [param('userId').isInt().toInt()], ash(followUser))

export default router
