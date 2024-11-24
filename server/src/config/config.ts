import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  connectionString:process.env.MONGO_CONNECTION_STRING,
  mode:process.env.NODE_ENV
};

export const config = Object.freeze(_config);
