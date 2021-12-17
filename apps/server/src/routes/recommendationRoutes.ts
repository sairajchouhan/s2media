import { Router } from 'express'
import ash from 'express-async-handler'
import { getFollowRecommendations } from '../handlers/recommendationHandler'
import auth from '../middlewares/auth'

const router = Router()

router.get('/follow', auth, ash(getFollowRecommendations))

export default router
