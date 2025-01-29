import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; userType: string };
}

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.userType !== "admin") {
    res.status(403).json({ error: "Forbidden: Admin access required." });
    return;
  }

  next();
};
