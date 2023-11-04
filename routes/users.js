import express  from "express";

import loginUser from "../controllers/Users/loginUser.js";
import signupUser from "../controllers/Users/signupUser.js";
import updateUser from "../controllers/Users/updateUser.js";
import resetPassword from "../controllers/Users/resetPassword.js";

import AuthHandler from "../middlewares/AuthHandler.js";

const userRouter = express.Router();

//login route
userRouter.post('/login', loginUser);

//signup route
userRouter.post('/signup', signupUser);

//update profile
userRouter.patch('/profile', AuthHandler, updateUser);

//reset password
userRouter.patch('/password', AuthHandler, resetPassword );

export default userRouter;