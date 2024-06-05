import dotenv from "dotenv";
import {User} from "./models/user.models.js";
import connectDB from "./db/index.js";
import app from "./app.js";
import bcrypt from "bcryptjs";
dotenv.config({
    path:"./.env"
});

connectDB()
.then(()=>{
    
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((e) => {
    console.error("MongoDB connection error : ",e);
    
});

app.get('/test', (req, res) => {
    res.json({ message: 'pass!' });
});
// app.post('/register',async (req, res) => {
//     try{
//         const {name,email,password} = req.body;
//     const newUser = await userModel.create({
//         name,
//         email,
//         password: bcrypt.hashSync(password, 10)
//     });
//     await newUser.save();

//     }catch(e){
//         console.error(e);
//     }
    
    
// });