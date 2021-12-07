import type { Request, Response } from 'express'
import { redis } from '../config/redis'
import createError from 'http-errors'

export type NotificationType = 'like_post' | 'like_comment' | 'reply_to_comment' | 'comment_on_post'

export interface Notification {
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

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId

  const resp = await redis.lrange(`user:notification:${req.user.uid}`, 0, -1)

  if (!resp) createError(404, 'Notification not found')

  const notifications = resp.map((notification) => JSON.parse(notification))

  // get the index of the notfiication
  const index = notifications.findIndex((notification) => notification.id === notificationId)
  const noti = notifications[index]
  if (!noti) createError(404, 'Notification not found')
  console.log(noti.isRead)
  console.log(typeof noti.isRead)
  if (noti.isRead) throw createError(400, 'Notification already read')

  noti.isRead = true
  await redis.lset(`user:notification:${req.user.uid}`, index, JSON.stringify(noti))

  res.json({ success: true })

  await redis.publish(
    'REFETCH_NOTIFICATIONS',
    JSON.stringify({
      userId: req.user.uid,
    })
  )
  console.log('puslished')
}
