import mongoose from "mongoose";

export interface Post {
  admin: mongoose.Schema.Types.ObjectId;
  text: string;
  media: string;
  public_id: string;
  likes: string[];
  comments: string[];
}
