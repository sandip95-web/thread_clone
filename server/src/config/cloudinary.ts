import { v2 as cloudinary } from 'cloudinary';
import {config} from '../config/config'
cloudinary.config({ 
  cloud_name: config.cloudinaryCloud, 
  api_key: config.cloudinaryKey, 
  api_secret: config.cloudinarySecret 
});

export default cloudinary