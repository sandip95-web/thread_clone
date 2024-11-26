import { NextFunction, Request, Response } from "express";
import tryCatchHandler from "../utils/tryCatchHandler";
import createHttpError from "http-errors";
import postModel from "../post/postModel";
import commentModel from "./commentModel";
import { AuthRequest } from "../middleware/auth";
import userModel from "../user/userModel";

export const addComment = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // id of the post that you want to comment
    const { id } = req.params;
    const { text } = req.body;
    const _req = req as AuthRequest;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    // checking if the post exist or not
    const postExist = await postModel.findById(id);
    if (!postExist) {
      return next(createHttpError(400, "Post doesn't exist"));
    }
    // add new comment to the database
    const newComment = await commentModel.create({
      text,
      admin: _req.user._id,
      post: postExist._id,
    });
    // now add the comment reference go postmodel as well
    await postModel.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment._id },
      },
      {
        new: true,
      }
    );
    // add the comment reference to the user model replies
    await userModel.findByIdAndUpdate(
      _req.user._id,
      {
        $push: { replies: newComment._id },
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "New Comment Added." });
  }
);

export const deleteComment = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, id } = req.params;
    const _req = req as AuthRequest;
    if (!postId || !id) {
      return next(createHttpError(400, "Error deleting comment."));
    }
    const postExist = await postModel.findById(postId);
    if (!postExist) {
      return next(createHttpError(400, "Post doesn't exist."));
    }
    const commentExist = await commentModel.findById(id);
    if (!commentExist) {
      return next(createHttpError(400, "comment doesn't exist."));
    }
    if (postExist.comments.includes(id)) {
      if (_req.user._id.toString() !== commentExist.admin.toString()) {
        return next(
          createHttpError(400, "You are not authorized to delete this comment.")
        );
      }

      await postModel.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        {
          new: true,
        }
      );
      await userModel.findByIdAndUpdate(
        _req.user._id,
        {
          $pull: { replies: id },
        },
        {
          new: true,
        }
      );
      await commentModel.findByIdAndDelete(id, { new: true });
      res.status(204).json({
        message: "Comment deleted successfully.",
      });
    } else {
      res.status(400).json({
        message: "Post with that comment doesn't exist",
      });
    }
  }
);
