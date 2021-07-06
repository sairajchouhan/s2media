import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { getAllUsers, getAuthUserInfo, getUserInfo, updateProfile } from '../handlers/userHandler'
import auth from '../middlewares/auth'

const router = Router()

router.get('/me', auth, ash(getAuthUserInfo))
router.get('/all', ash(getAllUsers))
router.get('/:userId', [param('userId').exists()], ash(getUserInfo))

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
