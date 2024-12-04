import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401).json({ message: "Unauthorized" });

    if (token) {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user: { username: string }) => {
        if (err) {
          return res.sendStatus(403).json({ message: "Forbidden" });
        }
        req.user = user as JwtPayload;
        return next();
      });
    } else {
      return res.sendStatus(401).json({ message: "Unauthorized" });
    }
  // TODO: verify the token exists and add the user data to the request object
};
