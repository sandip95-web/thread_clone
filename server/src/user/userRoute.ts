import express from "express";
import {getUserDetails, loginUser, signIn } from "./userController";
import Auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signin", signIn);
userRouter.post("/login", loginUser);
userRouter.post("/:id", getUserDetails);


export default userRouter;
