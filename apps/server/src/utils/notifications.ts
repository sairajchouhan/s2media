import { redis } from '../config/redis'
import { v4 as uuid } from 'uuid'

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

export const createNotification = async (notificationObject: Notification) => {
  const res = await redis.publish(
    'NOTIFICATION',
    JSON.stringify({ ...notificationObject, id: uuid(), timestamp: new Date() })
  )
  return res
}
