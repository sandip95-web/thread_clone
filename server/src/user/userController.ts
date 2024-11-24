import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "./userType";
import { config } from "../config/config";

const generateToken = async (res: Response, user: User, next: NextFunction) => {
  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: config.jwtExpire,
    });
    return token;
  } catch (error) {
    return next(createHttpError(500, "Error while signing token"));
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(
        createHttpError(400, "Username, email, and password are required.")
      );
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return next(createHttpError(409, "User already exists with this email."));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return next(createHttpError(400, "Error while hashing password"));
    }
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return next(createHttpError(400, "Error while saving user."));
    }
    const accessToken = await generateToken(res, newUser, next);
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: `User Sign in successfully! Welcome ${newUser?.username}`,
    });
  } catch (error) {
    console.log("Error:",error)
    return next(
      createHttpError(
        500,
        "An error occurred while processing your request. Please try again later."
      )
    );
  }
};
