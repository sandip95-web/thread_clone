import express, { NextFunction, Request, Response } from "express";
import userRouter from "./user/userRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import postRouter from "./post/postRoute";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to Thread-clone api/v1");
});
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.use(globalErrorHandler);

export default app;
