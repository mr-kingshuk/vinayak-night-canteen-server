import express from 'express';

import addTiming from '../controllers/StoreTiming/addTiming.js';
import getTiming from '../controllers/StoreTiming/getTiming.js';
import isMerchant from '../middlewares/isMerchant.js';


const timingRouter = express.Router();

//gets the store Timing to the user.
timingRouter.get('/time', getTiming);

/* adds store timing and changes the scheduled time to 
 * 1. turn on/off items, 
 * 2. reset order number, 
 * 3. changes items on/off if changed time is now IST. 
 * */ 
timingRouter.post('/', isMerchant, addTiming);

export default timingRouter;