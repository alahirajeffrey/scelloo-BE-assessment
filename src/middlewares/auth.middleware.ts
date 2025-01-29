import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; userType: string };
}

export const isLoggedIn = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Token is required." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jwt_secret");
    req.user = decoded as { id: string; email: string; userType: string };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};
