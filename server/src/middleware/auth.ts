import { NextFunction, Request, Response } from "express";
import tryCatchHandler from "../utils/tryCatchHandler";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import userModel from "../user/userModel";
import { User } from "../user/userType";

export interface AuthRequest extends Request {
  user: User;
}

const Auth = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      return next(createHttpError(400, "Token is required."));
    }
    const decoded = verify(token, config.jwtSecret as string);
    if (!decoded) {
      return next(createHttpError(400, "Invalid or expired token."));
    }

    const user = await userModel.findById(decoded.sub);
    // .populate("followers")
    // .populate("threads")
    // .populate("replies")
    // .populate("reposts");
    if (!user) {
      return next(createHttpError(400, "User not found."));
    }
  
    const _req = req as AuthRequest;
    _req.user = user;

    next();
  }
);

export default Auth;
