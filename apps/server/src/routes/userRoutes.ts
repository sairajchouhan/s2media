import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param, query } from 'express-validator'
import { getAllPostsOfUser, getAllUsers, getAuthUserInfo, getUserInfo, updateProfile } from '../handlers/userHandler'
import auth from '../middlewares/auth'
import follow from '../middlewares/follow'
import { singleImageUploadMiddleware } from '../middlewares/singleImageUpload'
import validate from '../middlewares/validate'

const router = Router()

router.get('/me', auth, ash(getAuthUserInfo))
router.get('/all', ash(getAllUsers))
router.get('/:username', auth, follow, [param('username').exists().trim().escape()], validate, ash(getUserInfo))
router.get(
  '/:username/post',
  auth,

  [
    param('username').exists().trim().escape(),
    query('like').optional().toBoolean(),
    query('save').optional().toBoolean(),
  ],
  validate,
  ash(getAllPostsOfUser)
)

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
  validate,
  singleImageUploadMiddleware,
  ash(updateProfile)
)

export default router
