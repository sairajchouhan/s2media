import { Router } from 'express'
import ash from 'express-async-handler'
import { getFollowRecommendations, recentSignUpUsers } from '../handlers/recommendationHandler'
import auth from '../middlewares/auth'

const router = Router()

router.get('/follow', auth, ash(getFollowRecommendations))
router.get('/new', auth, ash(recentSignUpUsers))

export default router
