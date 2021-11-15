import { initAdmin } from '../config/firebase-admin'
import Redis from 'ioredis'

export const init = () => {
  const redis = new Redis({ host: process.env.REDIS_HOST })
  initAdmin()
  return { redis }
}
