import { Router } from 'express'
import { updateProfile, getAllUsers, getAuthUserInfo, getUserInfo } from '../handlers/userHandler'
import ash from 'express-async-handler'

import auth from '../middlewares/auth'
import { body, param } from 'express-validator'

const router = Router()

router.get('/me', auth, ash(getAuthUserInfo))
router.get('/all', ash(getAllUsers))
router.get('/:userId', [param('userId').isInt().toInt()], ash(getUserInfo))

router.put(
  '/profile',
  auth,
  [
    body('bio')
      .trim()
      .optional()
      .customSanitizer((value) => {
        return value === '' ? null : value
      }),
    body('displayName')
      .trim()
      .optional()
      .customSanitizer((value) => {
        return value === '' ? null : value
      }),
  ],
  ash(updateProfile)
)

export default router
