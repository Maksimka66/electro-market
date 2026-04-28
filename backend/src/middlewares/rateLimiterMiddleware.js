import { rateLimit } from 'express-rate-limit'
import ioRedis from '../configs/config.js'

const limiter = rateLimit({
    windowMs: 0.3 * 60 * 1000,
    limit: 3
    // store: ioRedis
})

export default limiter

