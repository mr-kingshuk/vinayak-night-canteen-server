import { storeTimingModel } from "../../models/StoreTiming/StoreTiming.js";

const getTiming = async (req, res) => {
    try{
      const timing = await storeTimingModel.find();
      return res.status(200).json(timing);
    }
    catch(err){
      return res.status(500).json({"error": err});
    }
};

export default getTiming;