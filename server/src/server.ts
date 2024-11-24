import app from './app';
import { config } from './config/config';

const port= config.port || 4444

app.listen(port,()=>{
  console.log(`Listening from Port: ${port}`)
})