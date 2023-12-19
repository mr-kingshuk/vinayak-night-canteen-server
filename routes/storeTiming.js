import express from 'express';
import isMerchant from '../middlewares/isMerchant.js';
import { storeTimingModel } from '../models/StoreTiming/StoreTiming.js';
import scheduler from '../schedule.js';

const timingRouter = express.Router();

timingRouter.get('/time', isMerchant, async (req, res) => {
    try{
      const timing = await storeTimingModel.find();
      return res.status(200).json(timing);
    }
    catch(err){
      return res.status(500).json({"error": err});
    }
});

timingRouter.post('/', isMerchant, async (req, res) => {
  console.log(req.body);
    const { openHour, openMin, closeHour, closeMin} = req.body.body;
    console.log(openHour, openMin, closeHour, closeMin);
    try {
        // Validate input values here if needed
        if(openHour < 0 || openHour > 23 || closeHour < 0 || closeHour > 23 || openMin < 0 || openMin > 59 || closeMin < 0 || closeMin > 59)
            return res.status(404).json({ error : 'Timing out of bounds'});

        // Assuming you have a single document for the store timings in the collection
        const timing = await storeTimingModel.find();
        console.log(timing);
        const result = await storeTimingModel.findOneAndUpdate(
            { _id: timing[0]._id}, 
            {
              $set: {
                openHour: openHour,
                openMin: openMin,
                closeHour: closeHour,
                closeMin: closeMin,
              },
            },
            { new: true }
          );
          console.log(result);

          const cronOpen = `${result.openMin} ${result.openHour} * * *`;
          const cronClose = `${result.closeMin} ${result.closeHour} * * *`;
          scheduler(cronOpen, cronClose);

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

export default timingRouter;