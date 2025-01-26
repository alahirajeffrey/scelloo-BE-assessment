import rateLimit from "express-rate-limit";

// limit to 100 requests every 15 minutes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
  headers: true,
});
