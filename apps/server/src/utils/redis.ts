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
