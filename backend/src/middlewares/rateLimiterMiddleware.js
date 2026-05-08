import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import redisClient from '../configs/config.js'

const limiter = rateLimit({
    windowMs: 0.3 * 60 * 1000,
    limit: 3,
    ipv6Subnet: 56,
    store: new RedisStore({
        sendCommand: (command, ...args) => redisClient.call(command, ...args)
    })
})

export default limiter

