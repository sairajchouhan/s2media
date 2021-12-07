import type { Request, Response } from 'express'
import { redis } from '../config/redis'
import createError from 'http-errors'

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const notificationId = req.params.notificationId

  const resp = await redis.lrange(`user:notification:${req.user.uid}`, 0, -1)

  if (!resp) createError(404, 'Notification not found')

  const notifications = resp.map((notification) => JSON.parse(notification))
  const noti = notifications.find((notification) => notification.id === notificationId)

  console.log(noti)

  res.json('hi')
}
