import express from 'express';
import { signIn } from './userController';

const userRouter=express.Router();


userRouter.post("/signin",signIn)

export default userRouter;