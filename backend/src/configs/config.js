import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Redis from 'ioredis'

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

const redisConfig = {
    port: 6380,
    host: 'localhost',
    db: 0,
    password: process.env.REDIS_PASSWORD
}

const ioRedis = new Redis(redisConfig)

export default ioRedis

