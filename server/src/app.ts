import express, { NextFunction, Request, Response } from 'express';


const app=express();

app.get("/",(req:Request,res:Response,next:NextFunction)=>{
  res.send('Welcome to Thread-clone api/v1');
})


export default app;