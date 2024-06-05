import {v2 as cloudinary} from 'cloudinary';
import e from 'express';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });   
const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if (!localFilePath) return null;
        //Upload
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",

        })
        //If uploaded
        console.log("Uploaded",response.url);
        return response;

    }catch(e){
        
        console.log(e);
        fs.unlinkSync(localFilePath);// remove the locally saved temp file as upload got failed
        return null;
    }
}

export {uploadOnCloudinary};