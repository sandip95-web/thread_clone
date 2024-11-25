import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { User } from "./userType";
import { config } from "../config/config";
import tryCatchHandler from "../utils/tryCatchHandler";

const generateToken = async (res: Response, user: User, next: NextFunction) => {
  try {
    const accessToken = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: config.jwtExpire,
    });
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while signing token"));
  }
};

export const signIn = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    //validating if the field are empty or not
    if (!username || !email || !password) {
      return next(
        createHttpError(400, "Username, email, and password are required.")
      );
    }
    //checking if user exist or not
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return next(createHttpError(409, "User already exists with this email."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return next(createHttpError(400, "Error while hashing password"));
    }
    //creating new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return next(createHttpError(400, "Error while saving user."));
    }
    //generate Token
    await generateToken(res, newUser, next);

    res.status(201).json({
      success: true,
      message: `User Sign in successfully! Welcome ${newUser?.username}`,
    });
  }
);

export const loginUser = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "Email and Password are required."));
    }
    const findUser = await userModel.findOne({ email }).select("+password");
    if (!findUser) {
      return next(createHttpError(400, "User with that email doesn't exist"));
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return next(createHttpError(400, "Incorrect email or password."));
    }
    await generateToken(res, findUser, next);
    res.status(200).json({
      success: true,
      message: "User login successfully",
    });
  }
);

export const getUserDetails = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    const user = await userModel
      .findById(id)
      .populate("followers")
      .populate({
        path: "threads",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      })
      .populate({
        path: "replies",
        populate: [{ path: "post" }, { path: "admin" }],
      })
      .populate({
        path: "reposts",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      });
    res.status(200).json({ success: true, user });
  }
);
