import express  from "express";

import loginUser from "../controllers/Users/loginUser.js";
import signupUser from "../controllers/Users/signupUser.js";

const router = express.Router();

//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

export default router;