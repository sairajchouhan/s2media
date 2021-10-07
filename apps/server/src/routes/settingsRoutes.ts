import { Router } from 'express'
import ash from 'express-async-handler'
import { toggleProfileType } from '../handlers/settingsHandler'
import auth from '../middlewares/auth'

const router = Router()

router.post('/', auth, ash(toggleProfileType))

export default router
