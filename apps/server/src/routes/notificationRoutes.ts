import { Router } from 'express'
import { param } from 'express-validator'
import ash from 'express-async-handler'
import auth from '../middlewares/auth'
import { markNotificationAsRead } from '../handlers/notificationHandler'

const router = Router()

router.post(
  '/:notificationId',
  auth,
  [param('notificationId').exists()],
  ash(markNotificationAsRead)
)

export default router
