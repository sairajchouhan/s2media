import Redis from 'ioredis'

const redis_config = {
  host: process.env.REDIS_HOST!,
}
const redisSubscriber = new Redis(redis_config)
const redis = redisSubscriber.duplicate()

export { redisSubscriber, redis }
