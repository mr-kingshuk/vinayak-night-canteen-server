import express  from "express";

import loginUser from "../controllers/Users/loginUser.js";
import signupUser from "../controllers/Users/signupUser.js";

const userRouter = express.Router();

//login route
userRouter.post('/login', loginUser);

//signup route
userRouter.post('/signup', signupUser);

export default userRouter;