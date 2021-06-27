import { Router } from 'express'
import { login, register } from '../handlers/authHandler'
import { body } from 'express-validator'
import ash from 'express-async-handler'

const router = Router()

router.post(
  '/register',
  [
    body('username', 'Username is required').not().isEmpty().trim().escape(),
    body('email', 'Enter a valid email').isEmail().normalizeEmail(),
    body('password', 'Please enter a password with a minimum of 8 characters ').isLength({
      min: 6,
    }),
  ],
  ash(register)
)
router.post(
  '/login',
  [body('email', 'Enter a valid Email').isEmail().normalizeEmail(), body('password').exists()],
  ash(login)
)

export default router
