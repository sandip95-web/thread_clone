import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePic: string;
  public_id: string;
  followers: string[];
  threads: string[];
  replies: string[];
  reposts: string[];
}
