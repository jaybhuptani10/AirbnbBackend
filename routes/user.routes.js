import { Router } from "express";
import {logoutUser, registerUser, userProfile} from "../controllers/user.controller.js";
import {loginUser} from "../controllers/user.controller.js";


const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").get(userProfile)
userRouter.route("/logout").post(logoutUser)
export default userRouter;