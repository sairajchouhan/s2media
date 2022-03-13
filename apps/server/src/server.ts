import './config/dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app'

import { getCorsOrigin } from './utils'
import { channels, emitNotification, getNotificationDataFromRedis } from './utils/redis'
import { redis, redisSubscriber } from './config/redis'

import { Notification } from './types'

const socketServer = createServer(app)
const io = new Server(socketServer, {
  cors: {
    origin: getCorsOrigin(),
  },
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

redisSubscriber.subscribe(channels, (err, count) => {
  if (err) {
    console.error('Failed to subscribe: %s', err.message)
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    )
  }
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

const PORT = process.env.PORT || 5000
socketServer.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`)
})
