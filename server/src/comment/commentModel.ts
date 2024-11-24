import mongoose from "mongoose";
import { Comment } from "./commentType";

const commentSchema = new mongoose.Schema<Comment>(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<Comment>("Comment", commentSchema);
