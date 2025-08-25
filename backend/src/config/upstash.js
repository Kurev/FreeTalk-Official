import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';        

dotenv.config(); // Load environment variables from .env file

// create a ratelimiter that allows 100 requests every 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '60 s'), // 10 requests every 10 seconds

})

export default ratelimit;
