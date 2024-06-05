import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the URL of the current module file
const currentModuleUrl = import.meta.url;

// Convert the module URL to a file path
const currentModulePath = fileURLToPath(currentModuleUrl);

// Get the directory name of the module file
const currentModuleDir = dirname(currentModulePath);

const app = express(); 

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    
    }
));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/uploads', express.static("C:/Users/Jay/Desktop/AirBnb Clone/Backend/uploads"));
app.use(cookieParser());

//Routes
import userRouter from './routes/user.routes.js';
import uploadImagesRouter from './routes/uploadImages.routes.js';



//Routes declaration
app.use("/api/users", userRouter);
app.use("/api/images", uploadImagesRouter);

export default app;