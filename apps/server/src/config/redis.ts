import Redis from 'ioredis'

interface RedisConfig {
  host: string
  port?: number
  password?: string
}

const config: RedisConfig = {
  host: process.env.REDIS_HOST!,
}

if (process.env.NODE_ENV === 'production') {
  config.port = parseInt(process.env.REDIS_PORT!)
  config.password = process.env.REDIS_PASSWORD
}

export const redis = new Redis(config)
