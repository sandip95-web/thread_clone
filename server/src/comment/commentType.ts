import mongoose from "mongoose";

export interface Comment{
  admin:mongoose.Schema.Types.ObjectId,
  post:mongoose.Schema.Types.ObjectId,
  text:string
}