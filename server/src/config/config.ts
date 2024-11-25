import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  connectionString:process.env.MONGO_CONNECTION_STRING,
  mode:process.env.NODE_ENV,
  jwtSecret:process.env.JWT_SECRET,
  jwtExpire:process.env.JWT_EXPIRE,
  cloudinaryCloud:process.env.CLOUDINARY_CLOUD,
  cloudinaryKey:process.env.CLOUDINARY_KEY,
  cloudinarySecret:process.env.CLOUDINARY_SECRET,
};

export const config = Object.freeze(_config);
