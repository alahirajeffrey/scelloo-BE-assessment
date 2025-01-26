import rateLimit from "express-rate-limit";

// limit to 5 requests every 10 minutes
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again later.",
});
