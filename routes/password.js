import express from 'express';

import forgetPassword from '../controllers/Password/forgetPassword.js';
import verifyLink from '../controllers/Password/verifyLink.js';
import resetPassword from '../controllers/Password/resetPassword.js';

const passwordRouter = express.Router();

passwordRouter.post('/forget-password', forgetPassword);

passwordRouter.get('/reset-password', verifyLink);

passwordRouter.post('/reset-password', resetPassword);

export default passwordRouter;