import express from "express";
import {
  followUser,
  getUserDetails,
  loginUser,
  searchUser,
  signIn,
  updateProfile,
} from "./userController";
import Auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signin", signIn);
userRouter.post("/login", loginUser);
userRouter.post("/:id", Auth, getUserDetails);
userRouter.put("/follow/:id", Auth, followUser);
userRouter.put("/update", Auth, updateProfile);
userRouter.get("/search/:query", Auth, searchUser);

export default userRouter;
