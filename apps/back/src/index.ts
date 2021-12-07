import { Server } from 'socket.io'
import { Notification } from './types'
import { redisSubscriber, redis } from './config'
import { getNotificationDataFromRedis, emitNotification } from './helpers'

const socket_io_port = parseInt(process.env.PORT!) || 8080

;(async () => {
  const io = new Server(socket_io_port, {
    cors: {
      origin: 'http://localhost:3000',
    },
  })

  redisSubscriber.subscribe('NOTIFICATION', (err, count) => {
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
      console.log(`emitting notifications for ${notification.userIdWhoReceivesNotification}`)
      socket.emit('NOTIFICATION', notificationData)
    }
  })
})()
