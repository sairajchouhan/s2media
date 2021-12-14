import { Server } from 'socket.io'
import { createServer } from 'http'
import { Notification } from './types'
import { redisSubscriber, redis } from './config'
import { getNotificationDataFromRedis, emitNotification } from './helpers'

const httpServer = createServer()
const socket_io_port = 8080
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})
const serverOrigin = 'http://localhost:8080'

httpServer.on('request', async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (req.url === '/back/health' && req.method === 'GET') {
    res.end('✅')
  }

  if (req.url?.startsWith('/back/search') && req.method === 'POST') {
    const url = new URL(req.url, serverOrigin)
    const q = url.searchParams.get('q')
    if (!q || q.trim() === '') {
      res.statusCode = 400
      return res.end('Bad Request')
    }

    const uppserUsername = q.toUpperCase()
    const captialUsernames = []
    const rank = await redis.zrank('users', uppserUsername)
    if (rank != null) {
      const temp = await redis.zrange('users', rank, rank + 100)
      for (const el of temp) {
        if (!el.startsWith(uppserUsername)) {
          break
        }
        if (el.endsWith('*')) {
          captialUsernames.push(el.substring(0, el.length - 1))
        }
      }
    }

    const resultString: Array<any> = []
    captialUsernames.forEach((username) => {
      resultString.push(redis.get(`user:${username}`))
    })

    const result = (await Promise.all(resultString)).map((el) => JSON.parse(el))

    const respResult = JSON.stringify({ result })
    res.writeHead(200, {
      'Content-Type': 'application/json',
      ...headers,
    })
    res.end(respResult)
  }
})

const channels = ['NOTIFICATION', 'REFETCH_NOTIFICATIONS']

httpServer.listen(socket_io_port, () => {
  console.log(`Back server listening on port ${socket_io_port}`)
  redisSubscriber.subscribe(channels, (err, count) => {
    if (err) {
      console.error('Failed to subscribe: %s', err.message)
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      )
    }
  })

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('JOIN_USER_ROOM', (userId) => {
      socket.join(userId)
    })

    socket.on('GIVE_MY_NOTIFICATIONS', async (data) => {
      await emitNotification(socket, data)
    })
  })

  redisSubscriber.on('message', async (channel, message) => {
    if (channel === 'NOTIFICATION') {
      const notification: Notification = JSON.parse(message)
      await redis.ltrim(`user:notification:${notification.userIdWhoReceivesNotification}`, 0, 99)
      await redis.lpush(
        `user:notification:${notification.userIdWhoReceivesNotification}`,
        JSON.stringify(notification)
      )

      const socket = io.to(`${notification.userIdWhoReceivesNotification}`)
      const notificationData = await getNotificationDataFromRedis(
        notification.userIdWhoReceivesNotification
      )
      socket.emit('NOTIFICATION', notificationData)
    }

    if (channel === 'REFETCH_NOTIFICATIONS') {
      const userId = JSON.parse(message).userId
      const notificationData = await getNotificationDataFromRedis(userId)
      io.to(userId).emit('NOTIFICATION', notificationData)
    }
  })
})
