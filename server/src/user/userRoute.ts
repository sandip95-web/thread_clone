import express from "express";
import {
  followUser,
  getUserDetails,
  loginUser,
  logoutUser,
  myInfo,
  searchUser,

  signIn,
  updateProfile,
} from "./userController";
import Auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/signin", signIn);
userRouter.post("/login", loginUser);
userRouter.get("/detail/:id", Auth, getUserDetails);
userRouter.put("/follow/:id", Auth, followUser);
userRouter.put("/update", Auth, updateProfile);
userRouter.get("/search/:query", Auth, searchUser);
userRouter.post("/logout", Auth, logoutUser);
userRouter.get("/me", Auth, myInfo);

export default userRouter;
