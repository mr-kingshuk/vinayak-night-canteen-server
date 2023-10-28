import express  from "express";

import addWorker from "../controllers/UserType/addWorker.js";
import getWorkers from "../controllers/UserType/getWorkers.js";
import deleteWorker from "../controllers/UserType/deleteWorker.js";

import isMerchant from '../middlewares/isMerchant.js';

const userTypesRouter = express.Router();

//adds a new worker to userType, if the email is signed in.
userTypesRouter.post('/', isMerchant , addWorker);

//Gets all the worker details.
userTypesRouter.get('/', isMerchant, getWorkers);

//delete the worker details.
userTypesRouter.delete('/:id', isMerchant, deleteWorker);

export default userTypesRouter;