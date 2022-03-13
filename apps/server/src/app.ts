import express from 'express'
const app = express()
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error'
import compression from 'compression'
import routes from './routes'
import { getCorsOrigin } from './utils'

// middlewares
app.use(compression({}))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: getCorsOrigin(),
  })
)

// Routes
app.get('/health', async (_, res) => {
  res.send('OK ✅\n')
})

app.use('/api/v1/auth', routes.authRoutes)
app.use('/api/v1/user', routes.userRoutes)
app.use('/api/v1/user/follow', routes.followRoutes)
app.use('/api/v1/post', routes.postRoutes)
app.use('/api/v1/post/like', routes.likeRoutes)
app.use('/api/v1/post/save', routes.saveRoutes)
app.use('/api/v1/post/comment', routes.commentRoutes)
app.use('/api/v1/post/comment/reply', routes.replyRoutes)
app.use('/api/v1/post/comment/like', routes.commentLikeRoutes)
app.use('/api/v1/post/reply/like', routes.replyLikeRoutes)
app.use('/api/v1/settings/profileType', routes.settingsRoutes)
app.use('/api/v1/notification', routes.notificationRoutes)
app.use('/api/v1/recommendation', routes.recommendationRoutes)

app.use(errorMiddleware)
export default app
