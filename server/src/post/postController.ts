import { NextFunction, Request, Response } from "express";
import tryCatchHandler from "../utils/tryCatchHandler";
import formidable, { Fields, File, Files } from "formidable";
import createHttpError from "http-errors";
import postModel from "./postModel";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middleware/auth";
import userModel from "../user/userModel";

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
