import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.userDecode.isAdm) {
    throw new AppError("Not permission", 403);
  }

  return next();
};

export default ensureIsAdmMiddleware;
