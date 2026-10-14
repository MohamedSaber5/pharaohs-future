import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV !== "production";

/**
 * General API rate limiter - disabled in development
 */
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: isDev ? 10000 : (parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100),
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev,
  message: { success: false, message: "Too many requests from this IP, please try again later." },
});

/**
 * Stricter limiter for auth endpoints - 100 in dev, 10 in prod
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 100 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDev,
  message: { success: false, message: "Too many authentication attempts. Please try again later." },
});
