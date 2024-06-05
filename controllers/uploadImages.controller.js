import {uploadOnCloudinary} from "../utils/cloudinary.js";
import imageDownloader from "image-downloader";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const uploadByLink = async (req, res) => {
    try{
        const { link } = req.body;
    if (!link) {
        return res.status(400).json({ message: "Link is required" });
    }
    
    const newName = '/photo'+ Date.now() + ".jpg";
    await imageDownloader.image({
        url: link,
        dest: "C:/Users/Jay/Desktop/AirBnb Clone/Backend" +"/uploads"  + newName,
    
    })
    res.json( newName);

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
    
    


    
    
    
};


const uploadByFile = async (req, res) => {
    try{
        const uploadedFiles = [];
   
    for (let i = 0; i < req.files.length; i++) {
       
        const filePath = req.files[i].filename;
        uploadedFiles.push(filePath)
        // await uploadOnCloudinary("C:/Users/Jay/Desktop/AirBnb Clone/Backend" +"/uploads/" +filePath);
       
        
    }
    console.log(uploadedFiles);
    res.json(uploadedFiles);

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
    
};
export { uploadByLink };
export { uploadByFile };

// uploadImagesRouter.route("/upload").post(upload.array(
//     "photos", 100,

// ),uploadByFile)