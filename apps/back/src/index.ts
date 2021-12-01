import Redis from 'ioredis'

const config = {
  host: process.env.REDIS_HOST!,
}
const redisSubscriber = new Redis(config)
const redis = new Redis(config)

type NotificationType = 'like_post' | 'like_comment' | 'reply_to_comment' | 'comment_on_post'

const ttl7Days = 7 * 24 * 60 * 60

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
    console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`)
  }
})

redisSubscriber.on('message', async (channel, message) => {
  if (channel === 'NOTIFICATION') {
    const notification: Notification = JSON.parse(message)
    await redis.ltrim(`user:notification:${notification.userIdWhoReceivesNotification}`, 0, 99)
    await redis.lpush(`user:notification:${notification.userIdWhoReceivesNotification}`, JSON.stringify(notification))
    console.log(notification)
  }
})
