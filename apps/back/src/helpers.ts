import { redis } from './config'
import { Notification } from './types'
import type { Socket } from 'socket.io'

export const getNotificationDataFromRedis = async (userIdWhoReceivesNotification: string) => {
  const notifications = await redis.lrange(
    `user:notification:${userIdWhoReceivesNotification}`,
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
  return notificationData
}

export const emitNotification = async (socket: Socket, data: any) => {
  const notificationData = await getNotificationDataFromRedis(data.userId)
  console.log(`emitting notifications for ${data.userId}`, notificationData)
  socket.emit('NOTIFICATION', notificationData)
}
