import express from 'express';

import forgetPassword from '../controllers/Password/forgetPassword.js';
import verifyLink from '../controllers/Password/verifyLink.js';
import resetPassword from '../controllers/Password/resetPassword.js';

const passwordRouter = express.Router();

//send reset password link
passwordRouter.post('/forget-password', forgetPassword);

passwordRouter.post('/reset-password/:id/:token', resetPassword);

passwordRouter.get('/reset-password/:id/:token', verifyLink);

export default passwordRouter;