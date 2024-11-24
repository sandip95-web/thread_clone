import express, { NextFunction, Request, Response } from "express";
import userRouter from "./user/userRoute";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to Thread-clone api/v1");
});

app.use(globalErrorHandler);

export default app;
