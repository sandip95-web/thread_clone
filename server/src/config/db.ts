import mongoose, { mongo } from "mongoose";
import { config } from "./config";

const dbConnection = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected succesfully to the database");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting to the database: ", err);
    });
    await mongoose.connect(config.connectionString as string);
  } catch (error) {
    console.error("Failed to connect to database: ", error);
    process.exit(1);
  }
};

export default dbConnection;
