import Redis from 'ioredis'
import { Server } from 'socket.io'
import type { Socket } from 'socket.io'

type NotificationType = 'like_post' | 'like_comment' | 'reply_to_comment' | 'comment_on_post'

interface Notification {
  id?: string
  type: NotificationType
  userIdWhoReceivesNotification: string
  userWhoCausedNotification: any
  post_id: string
  comment_id?: string
  reply_id?: string
  meta?: any
  timestamp?: Date
  isRead: boolean
}

const socket_io_port = parseInt(process.env.PORT!) || 8080
const redis_config = {
  host: process.env.REDIS_HOST!,
}

;(async () => {
  const io = new Server(socket_io_port, {
    cors: {
      origin: 'http://localhost:3000',
    },
  })

  const redisSubscriber = new Redis(redis_config)
  const redis = redisSubscriber.duplicate()

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
    console.log('setting upSocket')

    socket.on('JOIN_USER_ROOM', (userId) => {
      socket.join(userId)
    })

    socket.on('GIVE_MY_NOTIFICATIONS', async (data) => {
      await fetchAndEmitNotifications(socket, data)
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
      const notifications = await redis.lrange(
        `user:notification:${notification.userIdWhoReceivesNotification}`,
        0,
        -1
      )

      const parsedNotifications: Notification[] = notifications.map((notification) =>
        JSON.parse(notification)
      )
      console.log(parsedNotifications.filter((noti) => noti.isRead === false).length)
      const notificationData = {
        notifications: notifications.map((notification) => JSON.parse(notification)),
        newNotificationNumber: parsedNotifications.filter((noti) => !noti.isRead).length,
      }
      console.log(
        `emitting notifications for ${notification.userIdWhoReceivesNotification}`,
        notificationData
      )
      socket.emit('NOTIFICATION', notificationData)
    }
  })

  const fetchAndEmitNotifications = async (socket: Socket, data: any) => {
    const notifications = await redis.lrange(`user:notification:${data.userId}`, 0, -1)

    const parsedNotifications: Notification[] = notifications.map((notification) =>
      JSON.parse(notification)
    )
    const notificationData = {
      notifications: notifications.map((notification) => JSON.parse(notification)),
      newNotificationNumber: parsedNotifications.filter((noti) => !noti.isRead).length,
    }
    console.log(`emitting notifications for ${data.userId}`, notificationData)
    socket.emit('NOTIFICATION', notificationData)
  }
})()
