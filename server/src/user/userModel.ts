import mongoose, { mongo } from "mongoose";
import { User } from "./userType";
import validator from "validator";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      validate: validator.isAlpha,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
      default:
        "https://imgs.search.brave.com/kPvkJPFmhHDpR09Lq9FpngZe59xDVoPeMHqfyYBtZhY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9",
    },
    public_id: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId,   ref: "User" }],
    threads: [{ type: mongoose.Schema.Types.ObjectId,   ref: "Post" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId,   ref: "Comment" }],
    reposts: [{ type: mongoose.Schema.Types.ObjectId,   ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
