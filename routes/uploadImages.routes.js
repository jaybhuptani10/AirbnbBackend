import { Router } from "express";
import { uploadByFile, uploadByLink } from "../controllers/uploadImages.controller.js";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";

const uploadImagesRouter = Router();
// const photosMiddleware = multer({dest:'./uploads'});
uploadImagesRouter.route("/uploadbylink").post(uploadByLink);
uploadImagesRouter.route("/upload").post(upload.array("photos", 100), uploadByFile);

// uploadImagesRouter.route("/upload").post(photosMiddleware.array("photos", 100), uploadByFile);
export default uploadImagesRouter;