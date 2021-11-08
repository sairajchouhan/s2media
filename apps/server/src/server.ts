import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { initAdmin } from './config/firebase-admin'
import Redis from 'ioredis'

// import { initAdmin } from './config/firebase-admin'
import errorMiddleware from './middlewares/error'
import routes from './routes'

const app = express()
// firebase setup
const redis = new Redis({ host: process.env.REDIS_HOST })
initAdmin()

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://s2media.vercel.app' : 'http://localhost:3000',
  })
)

// Routes
app.get('/test', (_req, res) => {
  redis.get('foo', function (err, result) {
    if (err) {
      console.error(err)
    } else {
      console.log(result) // Promise resolves to "bar"
      res.json(result)
    }
  })
})

app.post('/test', async (_req, res) => {
  const data = await redis.set('foo', 'bar') // returns promise which resolves to string, "OK"
  res.json({ data })
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

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(process.env.DATABASE_URL)
  console.log(`Server is up and running at http://localhost:${PORT}`)
})
