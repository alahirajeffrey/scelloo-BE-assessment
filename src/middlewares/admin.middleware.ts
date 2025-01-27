import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.userType !== "admin") {
    res.status(403).json({ error: "Forbidden: Admin access required." });
    return;
  }

  next();
};
