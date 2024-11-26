import express from "express";
import { addNewPost, deletePost, getAllPost, likePost, repost, singlePostDetail } from "./postController";
import Auth from "../middleware/auth";
const postRouter = express.Router();

postRouter.post("/add", Auth, addNewPost);
postRouter.get("/", Auth, getAllPost);
postRouter.delete("/delete/:id", Auth, deletePost);
postRouter.put("/like/:id", Auth, likePost);
postRouter.put("/repost/:id", Auth, repost);
postRouter.get("/:id", Auth, singlePostDetail);

export default postRouter;
