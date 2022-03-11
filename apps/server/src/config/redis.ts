import Redis from 'ioredis'

interface RedisConfig {
  host: string
  port?: number
  password?: string
}

const config: RedisConfig = {
  host: process.env.REDIS_HOST!,
}

export const redis = {}
