import mongoose from "mongoose";
import { User } from "../user/userType";

export interface Post {
  admin: mongoose.Schema.Types.ObjectId | User;
  text: string;
  media: string;
  public_id: string;
  likes: string[];
  comments: string[];
}
