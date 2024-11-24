import app from './app';
import { config } from './config/config';
import dbConnection from './config/db';

const startServer=async()=>{
  await dbConnection()  

  const port= config.port || 4444

  app.listen(port,()=>{
    console.log(`Listening from Port: ${port}`)
  })
}


startServer()


