import { redis } from '../config/redis'
import { v4 as uuid } from 'uuid'
import { Notification } from '../types'

export const createNotification = async (notificationObject: Notification) => {
  const res = await redis.publish(
    'NOTIFICATION',
    JSON.stringify({ ...notificationObject, id: uuid(), timestamp: new Date() })
  )
  return res
}
