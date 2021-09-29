import { Router } from 'express'
import ash from 'express-async-handler'
import { param } from 'express-validator'
import { followUser } from '../handlers/followHandler'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'

const router = Router()

router.post('/:userId', auth, [param('userId').exists().trim().escape()], validate, ash(followUser))

export default router
