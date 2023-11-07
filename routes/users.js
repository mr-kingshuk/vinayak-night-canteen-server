import express  from "express";

import loginUser from "../controllers/Users/loginUser.js";
import signupUser from "../controllers/Users/signupUser.js";
import updateUser from "../controllers/Users/updateUser.js";

import AuthHandler from "../middlewares/AuthHandler.js";

const userRouter = express.Router();

//login route
userRouter.post('/login', loginUser);

//signup route
userRouter.post('/signup', signupUser);

//update profile
userRouter.patch('/profile', AuthHandler, updateUser);

export default userRouter;