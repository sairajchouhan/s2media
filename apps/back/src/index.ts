import Redis from 'ioredis'
import { Server } from 'socket.io'

const socket_io_port = parseInt(process.env.PORT!) || 8080
const redis_config = {
  host: process.env.REDIS_HOST!,
}

const io = new Server(socket_io_port, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const redisSubscriber = new Redis(redis_config)
const redis = new Redis(redis_config)

type NotificationType = 'like_post' | 'like_comment' | 'reply_to_comment' | 'comment_on_post'

interface Notification {
  id?: string
  type: NotificationType
  userIdWhoCausedNotification: string
  userIdWhoReceivesNotification: string
  post_id: string
  comment_id?: string
  reply_id?: string
  meta?: any
  timestamp?: Date
}

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
  console.log('Got a connection')

  socket.on('GIVE_MY_NOTIFICATIONS', async (data) => {
    const notifications = await redis.lrange(`user:notification:${data.userId}`, 0, -1)
    const notificationData = {
      notifications: notifications.map((notification) => JSON.parse(notification)),
    }
    socket.emit('NOTIFICATION', notificationData)
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
    console.log(notification)
  }
})
