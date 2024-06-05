import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const existedUser = await User.findOne({
        $or : [{email}]
    })
    if(existedUser){
        alert("User already exists");
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const newUser = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            });
    await newUser.save();
    const createdUser = await  User.findById(newUser._id).select(
        "-password -refreshToken"
    );
    
    if (!createdUser){
        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        })
    }
    return res.status(201).json(
        alert("User created successfully"),
        new ApiResponse(true,"User created successfully",createdUser)
    )
});
const loginUser= asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userDoc = await User.findOne({email});
    if (userDoc){
        const pass = bcrypt.compareSync(password,userDoc.password);
        if (pass){
            jwt.sign({email: userDoc.email, id: userDoc._id , name: userDoc.name}, process.env.JWT_SECRET, {expiresIn: "1d"},(err,token)=>{
                if (err) throw err;
                res.cookie('token',token).json(userDoc);
                }
                
            );
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
    }
});
const userProfile = asyncHandler(async (req,res)=>{
    try{
        const {token} = req.cookies;
        if (token){
            jwt.verify(token, process.env.JWT_SECRET,{}, async(err,userDoc)=>{
                if (err){
                    return res.status(400).json({
                        success: false,
                        message: "Not authorized"
                    })
                }
                else{
                    const {name,email,id} = await User.findById(userDoc.id);
                    res.json({name,email,id});
                }
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Not authorized"
            })
        }
        
    }catch(e){
        console.log(e);
        
    }
   
    
});
const logoutUser = asyncHandler(async (req,res)=>{
    res.clearCookie('token').json({
        message: "Logged out successfully"
    });
});
export {registerUser};
export {loginUser};
export {userProfile};
export {logoutUser};