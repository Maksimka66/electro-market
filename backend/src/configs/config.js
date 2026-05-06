import RedisClient from 'ioredis'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

const redisConfig = {
    port: 6380,
    host: 'localhost'
}

const redisClient = new RedisClient(redisConfig)

export default redisClient

