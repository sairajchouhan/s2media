import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import errorMiddleware from './middlewares/error'
import routes from './routes'
import { init } from './utils/initialize'
import { redis } from './config/redis'
import prisma from '../prisma'
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
  app.get('/health', (_req, res) => {
    res.send('OK ✅ ')
  })

  app.get('/test', async (_req, res) => {
    console.timeLog('start')
    const usernamesObj = await prisma.user.findMany({
      select: {
        username: true,
      },
    })
    const usernames = usernamesObj.map((user) => user.username)

    for (const username of usernames) {
      const term = username.toUpperCase()
      const terms = []

      for (let i = 1; i < term.length; i++) {
        terms.push(0)
        terms.push(term.substring(0, i))
      }
      terms.push(0)
      terms.push(term + '*')
      ;(async () => {
        await redis.zadd('users', ...terms)
      })()
    }
    console.timeEnd('stop')
    res.send('OK')
  })

  app.post('/test', async (req, res) => {
    const q: string = (req.query.q as string) ?? ''
    if (q.trim() === '') {
      return res.status(400).send('Bad Request')
    }
    const uppserUsername = q.toUpperCase()
    const result = []
    const rank = await redis.zrank('users', uppserUsername)
    if (rank != null) {
      const temp = await redis.zrange('users', rank, rank + 100)
      for (const el of temp) {
        if (!el.startsWith(uppserUsername)) {
          break
        }
        if (el.endsWith('*')) {
          result.push(el.substring(0, el.length - 1))
        }
      }
    }
    return res.json({ result })
  })

  app.get('/user_lookup', async (_req, res) => {
    const allUsers = await prisma.user.findMany({
      include: {
        profile: {
          select: {
            displayName: true,
          },
        },
      },
    })

    const allUsersPromises: Array<Promise<any>> = []
    allUsers.forEach((user) => {
      const prom = redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
      allUsersPromises.push(prom)
    })
    await Promise.all(allUsersPromises)
    res.send('OK')
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
