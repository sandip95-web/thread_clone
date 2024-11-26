import e from 'express';
import express from 'express';
import { addComment, deleteComment } from './commentController';
import Auth from '../middleware/auth';
const commentRouter=express.Router();

commentRouter.post("/add/:id",Auth,addComment)
commentRouter.delete("/delete/:postId/:id",Auth,deleteComment)

export default commentRouter