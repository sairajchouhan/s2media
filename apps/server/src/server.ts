import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import errorMiddleware from './middlewares/error'
import routes from './routes'
import { init } from './utils/initialize'
import { redis } from './config/redis'
//
;(() => {
  const app = express()
  init()

  // middlewares
  app.use(morgan('dev'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://s2media.vercel.app'
          : 'http://localhost:3000',
    })
  )

  // Routes
  app.get('/test', async (_req, res) => {
    const temp = await redis.get('hi')
    console.log('cache')
    res.json({ temp })
  })

  app.post('/test', async (_req, res) => {
    const resp = await redis.set('hi', 'hello')
    console.log('cache')
    res.json({ resp })
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

  app.use(errorMiddleware)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`)
  })
})()
