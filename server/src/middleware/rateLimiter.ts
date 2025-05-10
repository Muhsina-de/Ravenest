import rateLimit from 'express-rate-limit';
import config from '../config';

// Create a limiter middleware
export const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes by default
    max: config.RATE_LIMIT_MAX_REQUESTS, // Limit each IP to 100 requests per windowMs
    message: {
        status: 'error',
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Create a more strict limiter for auth routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Increased from 5 to 20 attempts per windowMs
    message: {
        status: 'error',
        message: 'Too many login attempts from this IP, please try again after 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
}); 