import express from "express";
import { addNewPost } from "./postController";
import Auth from "../middleware/auth";
const postRouter = express.Router();

postRouter.post("/add", Auth, addNewPost);

export default postRouter;
