import express from 'express';
import { loginUser, signIn } from './userController';

const userRouter=express.Router();


userRouter.post("/signin",signIn)
userRouter.post("/login",loginUser)

export default userRouter;