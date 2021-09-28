import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { initAdmin } from './config/firebase-admin'
// import { initAdmin } from './config/firebase-admin'
import errorMiddleware from './middlewares/error'
import authRoutes from './routes/authRoutes'
import commentLikeRoutes from './routes/commentLikeRoutes'
import commentRoutes from './routes/commentRoutes'
import followRoutes from './routes/followRoutes'
import likeRoutes from './routes/likeRoutes'
import postRoutes from './routes/postRoutes'
import replyLikeRoutes from './routes/replyLikeRoutes'
import replyRoutes from './routes/replyRoutes'
import saveRoutes from './routes/saveRoutes'
import userRoutes from './routes/userRoutes'

const app = express()
// firebase setup
initAdmin()

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// Routes
app.get('/test', (_req, res) => {
  res.send('hello world')
})
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/user/follow', followRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/post/like', likeRoutes)
app.use('/api/v1/post/save', saveRoutes)
app.use('/api/v1/post/comment', commentRoutes)
app.use('/api/v1/post/comment/reply', replyRoutes)
app.use('/api/v1/post/comment/like', commentLikeRoutes)
app.use('/api/v1/post/reply/like', replyLikeRoutes)

app.use(errorMiddleware)

const PORT = process.env.NODE_ENV === 'production' ? 80 : 5000
app.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`)
  console.log(`Server is up and running at http://localhost:${PORT}`)
})
