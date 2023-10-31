import express  from "express";

import addWorker from "../controllers/Worker/addWorker.js";
import getWorkers from "../controllers/Worker/getWorkers.js";
import deleteWorker from "../controllers/Worker/deleteWorker.js";

import isMerchant from '../middlewares/isMerchant.js';

const workerRouter = express.Router();

//adds a new worker to userType, if the email is signed in.
workerRouter.post('/', isMerchant , addWorker);

//Gets all the worker details.
workerRouter.get('/', isMerchant, getWorkers);

//delete the worker details.
workerRouter.delete('/:id', isMerchant, deleteWorker);

export default workerRouter;