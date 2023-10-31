import express  from "express";

import isMerchant from '../middlewares/isMerchant.js';
import isWorker from '../middlewares/isWorker.js';

const userTypesRouter = express.Router();

//checks if signed in user is Merchant.
userTypesRouter.get('/isMerchant', isMerchant , (req, res) => {
    res.status(200).json({'status': true});
});

//chceks if signed in user is Worker
userTypesRouter.get('/isWorker', isWorker, (req, res) => {
    res.status(200).json({'status': true});
});

export default userTypesRouter;