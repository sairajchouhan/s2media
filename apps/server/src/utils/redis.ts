import { redis } from '../config/redis'
import { v4 as uuid } from 'uuid'
import { Notification } from '../types'
import type { Socket } from 'socket.io'

export const createNotification = async (notificationObject: Notification) => {
  const res = await redis.publish(
    'NOTIFICATION',
    JSON.stringify({ ...notificationObject, id: uuid(), timestamp: new Date() })
  )
  return res
}

export const storeAllCombinationsOfUsername = async (username: string) => {
  const usernames = [username]

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
}

export const channels = ['NOTIFICATION', 'REFETCH_NOTIFICATIONS']

export const getNotificationDataFromRedis = async (userIdWhoReceivesNotification: string) => {
  const notifications = await redis.lrange(
    `user:notification:${userIdWhoReceivesNotification}`,
    0,
    -1
  )
  const parsedNotifications: Notification[] = notifications.map((notification) =>
    JSON.parse(notification)
  )
  const notificationData = {
    notifications: notifications.map((notification) => JSON.parse(notification)),
    newNotificationNumber: parsedNotifications.filter((noti) => !noti.isRead).length,
  }
  return notificationData
}

export const emitNotification = async (socket: Socket, data: any) => {
  const notificationData = await getNotificationDataFromRedis(data.userId)
  socket.emit('NOTIFICATION', notificationData)
}
