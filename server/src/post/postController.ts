import { NextFunction, Request, Response } from "express";
import tryCatchHandler from "../utils/tryCatchHandler";
import formidable, { Fields, File, Files } from "formidable";
import createHttpError from "http-errors";
import postModel from "./postModel";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middleware/auth";
import userModel from "../user/userModel";
import commentModel from "../comment/commentModel";


export const addNewPost = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({});
    const _req = req as AuthRequest;
    form.parse(req, async (err, fields: Fields, files: Files) => {
      if (err) {
        return next(createHttpError(400, "Error in form parse"));
      }
      const post = new postModel();
      if (fields.text) {
        post.text = fields.text as string;
      }
      const postImage = files.media as File | undefined;
      if (postImage) {
        const uploadedImage = await cloudinary.uploader.upload(
          postImage.filepath,
          {
            folder: "Thread_clone/Posts",
          }
        );
        if (!uploadedImage) {
          return next(createHttpError(400, "Error while uploading image."));
        }
        post.media = uploadedImage.secure_url;
        post.public_id = uploadedImage.public_id;
      }

      post.admin = _req.user._id;
      const newPost = await post.save();
      await userModel.findByIdAndUpdate(
        _req.user._id,
        {
          $push: { threads: newPost._id },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ message: "Post Created !", newPost });
    });
  }
);

export const getAllPost = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page } = req.query;
    let pageNumber: number;
    pageNumber = Number(page);
    if (!page || page === undefined) {
      pageNumber = 1;
    }
    const posts = await postModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * 3)
      .limit(3)
      .populate("admin")
      .populate("likes")
      .populate({ path: "comments", populate: { path: "admin" } });
    res.status(200).json({ message: "Post fetched!", posts });
  }
);
export const deletePost = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const _req = req as AuthRequest;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    const postExist = await postModel.findById(id);
    if (!postExist) {
      return next(createHttpError(400, "Post doesn't exist"));
    }

    if (_req.user._id.toString() !== postExist.admin.toString()) {
      return next(
        createHttpError(400, "You are not authorized to delete this post.")
      );
    }
    if (postExist.media) {
      await cloudinary.uploader.destroy(postExist.public_id);
    }
    await commentModel.deleteMany({ _id: { $in: postExist.comments } });
    await userModel.updateMany(
      {
        $or: [{ threads: id }, { reposts: id }, { replies: id }],
      },
      {
        $pull: {
          threads: id,
          replies: id,
          reposts: id,
        },
      },
      {
        new: true,
      }
    );
    await postModel.findByIdAndDelete(id);
    res.sendStatus(204);
  }
);

export const likePost = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
   
    const _req = req as AuthRequest;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    const postExist = await postModel.findById(id);
    if (!postExist) {
      return next(createHttpError(400, "Post not found."));
    }
    const userId = _req.user._id.toString(); 
    if (postExist.likes.includes(userId)) {
      await postModel.findByIdAndUpdate(
        id,
        {
          $pull: { likes: _req.user._id },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Post Unliked." });
    } else {
      await postModel.findByIdAndUpdate(
        id,
        {
          $push: { likes: _req.user._id },
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Post Liked." });
    }
  }
);

export const repost = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const _req = req as AuthRequest;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    const post = await postModel.findById(id);

    if (!post) {
      return next(createHttpError(400, "Post not found."));
    }

    if (_req.user.reposts.includes(id)) {
      return next(createHttpError(400, "Post is already reposted !"));
    }
    await userModel.findByIdAndUpdate(
      _req.user._id,
      {
        $push: { reposts: post._id },
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Reposted" });
  }
);

export const singlePostDetail = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const _req = req as AuthRequest;
    if (!id) {
      return next(createHttpError(400, "Id is required."));
    }
    const post = await postModel
      .findById(id)
      .populate("admin")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "admin",
        },
      });
    res.status(201).json({ message: "Post fetched!",post });
  }
);
